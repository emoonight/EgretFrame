module ecs
{
    /**                                                       */


    export enum Op
    {
        RemoveEntity=0b0001,
        SafeRemoveEntity,
        AddComponent,
        RemoveComponent,
        UpdateComponent
    }



    export class EcsWorld implements IEcsReadOnlyWorld
    {
        private m_componentPoolFilters:EcsFilterList[] = new Array<EcsFilterList>(512);

        private m_entities:EcsEntity[] = new Array<EcsEntity>(1024);
        private m_entitiesCount:number;

        private m_reservedEntities = new Array<number>(256);
        private m_reservedEntitiesCount:number;

        private m_delayedUpdates:DelayedUpdate[] = new Array<DelayedUpdate>(1024);
        private m_delayedUpdatesCount:number=0;

        private m_filters:EcsFilter[] = new Array<EcsFilter>(64);
        private m_filtersCount:number;

        private readonly m_delayedOpMask:EcsComponentMask =new EcsComponentMask();
        private readonly m_debugListeners:List<IEcsWorldDebugListener> = new List<IEcsWorldDebugListener>();
        
        public static registerComponentCreator<T>($creator:{new():T})
        {
            EcsComponentPool.Instance<EcsComponentPool<T>>().setCreator($creator);
        }

        public static ShrinkComponentPool<T>():void
        {
            EcsComponentPool.Instance<EcsComponentPool<T>>().shrink();
        }

        //#region  debug
        public addDebugListener($observer:IEcsWorldDebugListener)
        {
            if(this.m_debugListeners.contains($observer))
            {
                console.warn("listener already exists");
                return;
            }

            this.m_debugListeners.add($observer);
        }

        public removeDebugListener($observer:IEcsWorldDebugListener)
        {
            this.m_debugListeners.remove($observer);
        }
        //#endregion

        public createEntity():number
        {
            return this.createEntityInternal(true);
        }

        public createrEntityWith<T>():T
        {
            return this.addComponent<T>(this.createEntityInternal(false));
        }

        public removeEntity($entity:number):void
        {
            if(this.m_entities[$entity].IsReserved)
                this.addDelayedUpdate(Op.RemoveEntity,$entity,null,-1);
        }

        public reserveEntity(entity:number,entityData:EcsEntity)
        {
            entityData.IsReserved = true;
            if(this.m_reservedEntitiesCount == this.m_reservedEntities.length)
                this.m_reservedEntities = ArrayUtils.resize(this.m_reservedEntities,this.m_reservedEntitiesCount<<1);
            
            this.m_reservedEntities[this.m_reservedEntitiesCount++] = entity
            
            //#region  debug

            for(let ii = 0 ; ii < this.m_debugListeners.count; ii++)
                this.m_debugListeners[ii].onEntityRemoved(entity);

            //#endregion
        }

        public getComponent<T>($entity:number):T
        {
            let entityData = this.m_entities[$entity];
            let pool = EcsComponentPool.Instance<EcsComponentPool<T>>();
            let link:ComponentsLink;
            // link.ItemId
            let i = entityData.ComponentsCount - 1;
            for( ; i>=0 ; i--)
            {
                link = entityData.Components[i];
                if(link.Pool == pool)
                    break;
            }

            return i != -1 ? pool.Items[link.ItemId] : null;
        }

        public getComponents<T>(entity:number,list:IList<T>):IList<T>
        {
            if(list != null)
            {
                list.clear();
                let entityData = this.m_entities[entity];
                for(let i = 0 ; i < entityData.ComponentsCount; i++)
                {
                    let link = entityData.Components[i];
                    list.add(link.Pool.getExistItemById(link.ItemId));
                }
            }

            return list;
        }

        public addComponent<T>($entity:number):T
        {
            let entityData = this.m_entities[$entity];
            let pool = EcsComponentPool.Instance<EcsComponentPool<T>>();

            //#region  debug
            let i = entityData.ComponentsCount - 1;
            for(;i>=0;i--)
            {
                if(entityData.Components[i].Pool === pool)
                    break;
            }

            if(i != -1)
                console.warn("component is already exists on enetity");
            //#endregion
            
            let link = new ComponentsLink(pool,pool.requestNewId());
            if(entityData.ComponentsCount == entityData.Components.length)
                entityData.Components = ArrayUtils.resize(entityData.Components,entityData.ComponentsCount<<1);
            
            entityData.Components[entityData.ComponentsCount++] = link;
            this.addDelayedUpdate(Op.AddComponent,$entity,pool,link.ItemId);

            //#region  debug
            let component = pool.Items[link.ItemId];
            for(let ii = 0 ; ii < this.m_debugListeners.count;ii++)
                this.m_debugListeners[ii].onComponentAdded($entity,component);
            //#endregion

            return pool.Items[link.ItemId];
        }

        public removeComponent<T>($entity:number):void
        {
            let entityData =this.m_entities[$entity];
            let pool = EcsComponentPool.Instance<EcsComponentPool<T>>();
            let link:ComponentsLink;
            link.ItemId = -1;
            let i = entityData.ComponentsCount - 1;
            for(; i >= 0;i--)
            {
                link = entityData.Components[i];
                if(link.Pool == pool)
                    break;
            }

            //#region 
            if(i == -1)
            {
                console.warn("component not exists on entity");
            }
            //#endregion

            this.addDelayedUpdate(Op.RemoveComponent,$entity,pool,link.ItemId);
            entityData.ComponentsCount--;
            ArrayUtils.copy(entityData.Components,i+1,entityData.Components,i,entityData.ComponentsCount-1);
        }

        public updateComponent<T>(entity:number):void
        {
            let entityData = this.m_entities[entity];
            let pool = EcsComponentPool.Instance<EcsComponentPool<T>>();
            let link:ComponentsLink;
            let i = entityData.ComponentsCount - 1;
            for( ; i >=0;i--)
            {
                link =entityData.Components[i];
                if(link.Pool == pool)
                    break;
            }

            //#region  debug

            if(i == -1)
                console.warn('compoonent not exists on entity ');

            //#endregion

            let typeId = EcsComponentPool.Instance<EcsComponentPool<T>>().getComponentTypeIndex();
            if(typeId < this.m_componentPoolFilters.length 
                && this.m_componentPoolFilters[typeId]!=undefined)
            {
                this.addDelayedUpdate(Op.UpdateComponent,entity,pool,link.ItemId);
            }
        }

        public getStats():EcsWorldStats
        {
            return new EcsWorldStats(
                this.m_entitiesCount -this.m_reservedEntitiesCount,
                this.m_reservedEntitiesCount,
                this.m_filtersCount,
                EcsHelpers.ComponentsCount
            )
        }

        public processDelayedUpdates(level:number=0)
        {
            let iMax = this.m_delayedUpdatesCount;
            for(let i = 0 ; i < iMax ; i++)
            {
                let op = this.m_delayedUpdates[i];
                let entityData = this.m_entities[op.Entity];
                this.m_delayedOpMask.copyFrom(entityData.Mask);
                switch(op.Type)
                {
                    case Op.RemoveEntity:
                        //#region 
                        if(entityData.IsReserved)
                            console.warn("Entity already removed");
                        //#endregion
                        
                        while(entityData.ComponentsCount > 0)
                        {
                            let link = entityData.Components[entityData.ComponentsCount-1];
                            let componentId = link.Pool.getComponentTypeIndex();
                            entityData.Mask.setBit(componentId,false);
                            let componentToRemove = link.Pool.getExistItemById(link.ItemId);
                            
                            //#region  debug
                            for(let ii = 0; ii<this.m_debugListeners.count ; ii++)
                                this.m_debugListeners[ii].onComponentRemoved(op.Entity,componentToRemove);
                            //#endregion

                            this.updateFilters(op.Entity,componentToRemove,this.m_delayedOpMask,entityData.Mask);
                            link.Pool.recycleById(link.ItemId);
                            this.m_delayedOpMask.setBit(componentId,false);
                            entityData.ComponentsCount--;
                        }
                        this.reserveEntity(op.Entity,entityData);
                        break;
                    case Op.SafeRemoveEntity:
                        if(!entityData.IsReserved && entityData.ComponentsCount ==0)
                            this.reserveEntity(op.Entity,entityData);
                        break;
                    case Op.AddComponent:
                        let bit = op.Pool.getComponentTypeIndex();

                        //#region debug

                        if(entityData.Mask.getBit(bit))
                            console.warn('cant add component on entity');

                        //#endregion

                        entityData.Mask.setBit(bit,true);
                        this.updateFilters(op.Entity,op.Pool.getExistItemById(op.ComponentId),this.m_delayedOpMask,entityData.Mask);
                        break;
                    case Op.RemoveComponent:
                        let bitRemove = op.Pool.getComponentTypeIndex();
                        let componentInstance = op.Pool.getExistItemById(op.ComponentId);

                        if(!entityData.Mask.getBit(bitRemove))
                            console.warn('cant remove component on entity');
                        
                        for(let ii = 0 ; ii < this.m_debugListeners.count;i++)
                            this.m_debugListeners[ii]
                        
                        entityData.Mask.setBit(bitRemove,false);
                        this.updateFilters(op.Entity,componentInstance,this.m_delayedOpMask,entityData.Mask)
                        op.Pool.recycleById(op.ComponentId);
                        if(entityData.ComponentsCount == 0 )
                            this.addDelayedUpdate(Op.SafeRemoveEntity,op.Entity,null,-1);
                        break;
                    case Op.UpdateComponent:
                        let filterList =this.m_componentPoolFilters[op.Pool.getComponentTypeIndex()];
                        let componentToUpdate = op.Pool.getExistItemById(op.ComponentId);
                        for(let filterId = 0 ; filterId < filterList.Count;filterId++)
                        {
                            let filter =filterList.Filters[filterId];
                            if(filter.ExcludeMask.BitsCount == 0 || !this.m_delayedOpMask.isIntersects(filter.ExcludeMask))
                                filter.raiseOnUpdateEvent(op.Entity,componentToUpdate);
                        }
                        break;
                }

                if(iMax > 0)
                {
                    if(this.m_delayedUpdatesCount == iMax)
                        this.m_delayedUpdatesCount = 0;
                    else
                    {
                        this.m_delayedUpdates = ArrayUtils.copy(this.m_delayedUpdates,iMax,this.m_delayedUpdates,0,this.m_delayedUpdatesCount - iMax);
                        this.m_delayedUpdatesCount -=iMax

                        //#region  debug
                        if(level > 0)
                            console.warn('Recursive updating in filters');
                        //#endregion

                        this.processDelayedUpdates(level + 1);
                    }
                    
                }
            }
        }


        public fillFilter(filter:EcsFilter):void
        {
            for(let i = 0 ; i < this.m_entitiesCount ; i++)
            {
                let entity = this.m_entities[i];
                if(!entity.IsReserved && entity.Mask.isCompatible(filter))
                {
                    if(filter.Entities.length == filter.EntitiesCount)
                        filter.Entities = ArrayUtils.resize(filter.Entities,filter.EntitiesCount <<1);
                    
                    filter.Entities[filter.EntitiesCount++] = i;
                }
            }   
        }



        public getFilter(include:EcsComponentMask,exclude:EcsComponentMask,shouldBeFilled:boolean):EcsFilter
        {
            //#region  debug
            if(include == null)
                console.warn('ArgumentNulllException include');
            
            if(exclude == null)
                console.warn('ArgumentNulllException exclude');

            //#endregion

            let i = this.m_filtersCount - 1;
            for(; i >= 0; i--)
            {
                if(this.m_filters[i].IncludeMask.isEquals(include) 
                    && this.m_filters[i].ExcludeMask.isEquals(exclude))
                    break;
            }

            if(i == -1)
            {
                i = this.m_filtersCount;

                let filter = new EcsFilter(include,exclude);
                if(shouldBeFilled)
                    this.fillFilter(filter);
                
                if(this.m_filtersCount == this.m_filters.length)
                    this.m_filters = ArrayUtils.resize(this.m_filters,this.m_filtersCount<<1);
                
                this.m_filters[this.m_filtersCount++] = filter;

                for(let bit = 0 ; bit < include.BitsCount ; bit++)
                {
                    let typeId = include.Bits[bit];
                    if(typeId == this.m_componentPoolFilters.length)
                        this.m_componentPoolFilters = ArrayUtils.resize(this.m_componentPoolFilters,EcsHelpers.getPowerOfTwoSize(typeId+1));
                    
                    let filterList = this.m_componentPoolFilters[typeId];

                    if(filterList == undefined)
                    {
                        filterList = new EcsFilterList();
                        this.m_componentPoolFilters[typeId] = filterList;
                    }

                    if(filterList.Count == filterList.Filters.length)
                        filterList.Filters = ArrayUtils.resize(filterList.Filters,filterList.Count << 1);
                    
                    filterList.Filters[filterList.Count++] = filter;
                }
            }

            return this.m_filters[i];
        }
        
        public updateFilters(entity:number,component:any,oldMask:EcsComponentMask,newMask:EcsComponentMask)
        {
            for(let i = this.m_filtersCount - 1 ; i >= 0; i--)
            {
                let filter = this.m_filters[i];
                let isNewMaskCompatible = newMask.isCompatible(filter);
                if(oldMask.isCompatible(filter))
                {
                    if(!isNewMaskCompatible)
                    {
                        //#region  debug
                        let ii = filter.EntitiesCount - 1;
                        for(; ii >=0 ; ii--)
                        {
                            if(filter.Entities[ii] == entity)
                                break;
                        }
                        if(ii == -1)
                            console.warn('entity should be in filter');
                        
                        filter.raiseOnRemoveEvent(entity,component);
                        //#endregion 
                    }
                }
                else
                {
                    if(isNewMaskCompatible)
                        filter.raiseOnAddEvent(entity,component);
                }
            }
        }


        public createEntityInternal($addSafeRemove:boolean):number
        {
            let entity:number;

            if(this.m_reservedEntitiesCount>0)
            {
                this.m_reservedEntitiesCount--
                entity = this.m_reservedEntities[this.m_reservedEntitiesCount];
                this.m_entities[entity].IsReserved = false;
            }
            else
            {
                entity = this.m_entitiesCount;
                if(this.m_entitiesCount == this.m_entities.length)
                    this.m_entities = ArrayUtils.resize(this.m_entities,this.m_entitiesCount << 1);
                
                this.m_entities[this.m_entitiesCount++] = new EcsEntity();
            }

            if($addSafeRemove)
                this.addDelayedUpdate(Op.SafeRemoveEntity,entity,null,-1);
            
            for(let ii = 0 ; ii < this.m_debugListeners.count; ii++)
                this.m_debugListeners[ii].onEntityCreated(entity);
            
            return entity;
        }

        public addDelayedUpdate($type:Op,$entity:number,$component:IEcsComponentPool,$componentId:number)
        {
            if(this.m_delayedUpdatesCount == this.m_delayedUpdates.length)
                this.m_delayedUpdates = ArrayUtils.resize(this.m_delayedUpdates,this.m_delayedUpdatesCount<<1);

            this.m_delayedUpdates[this.m_delayedUpdatesCount++] = new DelayedUpdate($type,$entity,$component,$componentId);
        }
    }
}