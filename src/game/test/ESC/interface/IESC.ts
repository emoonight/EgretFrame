module ecs
{
    /************************* esc system接口 *************************/
    export interface IEcsSystem{}

    export interface IEcsInitSystem extends IEcsSystem
    {
        initialize();
        destroy();
    }    

    export interface IEcsPreInitSystem extends IEcsSystem
    {
        preInitialize();
        preDestroy();
    }


    export interface IEcsRunSystem extends IEcsSystem
    {
        run():void;
    }

    /************************* esc system接口 *************************/

    /**                                                       */
    export interface IEcsWorldDebugListener
    {
        onEntityCreated($entity:number):void;
        onEntityRemoved($entity:number):void;
        onComponentAdded($entity:number,$component:any):void;
        onComponentRemoved($entity:number,$component:any):void;
    }

    export interface IEcsReadOnlyWorld
    {
        getComponent<T>($entity:number):T;
    }

    export interface IEcsFilterListener
    {
        onFilterEntityAdded($entity:number,$reason:any):void;
        onFilterEntityRemoved($entity:number,$reason:any):void;
        onFilterEntityUpdated($entity:number,$reason:any):void;
    }


    export enum Op
    {
        RemoveEntity=0b0001,
        SafeRemoveEntity,
        AddComponent,
        RemoveComponent,
        UpdateComponent
    }

    export class EcsWorldStats
    {
        ActiveEntities:number
        ReservedEntities:number
        Filters:number
        Components:number    

        constructor($active:number,$reserved:number,$filters:number,$components:number)
        {
            this.ActiveEntities = $active;
            this.ReservedEntities  = $reserved ;
            this.Filters = $filters;
            this.Components =$components;
        }
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

        //#region  debug
        public addDebugListener($observer:IEcsWorldDebugListener)
        {
            if(this.m_debugListeners.contains($observer))
            {
                console.warn("listener already exists");
                return;
            }

            this.m_debugListeners
        }

        public removeDebugListener($observer:IEcsWorldDebugListener)
        {
            this.m_debugListeners.remove($observer);
        }
        //#endregion

        public registerComponentCreator<T>($creator:{new():T})
        {
            EcsComponentPool.Instance<EcsComponentPool<T>>().setCreator($creator);
        }

        public createEntity():number
        {
            return this.createEntityInternal(true);
        }

        public removeEntity(entity:number):void
        {
            if(this.m_entities[entity].IsReserved)
                this.addDelayedUpdate(Op.RemoveEntity,entity,null,-1);
        }

        public getComponent<T>(entity:number):T
        {
            let entityData = this.m_entities[entity];
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


        public addComponent<T>(entity:number):T
        {
            let entityData = this.m_entities[entity];
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
            this.addDelayedUpdate(Op.AddComponent,entity,pool,link.ItemId);

            //#region  debug
            let component = pool.Items[link.ItemId];
            for(let ii = 0 ; ii < this.m_debugListeners.count;ii++)
                this.m_debugListeners[ii].onComponentAdded(entity,component);
            //#endregion

            return pool.Items[link.ItemId];
        }

        public removeComponent<T>(entity:number):void
        {
            let entityData =this.m_entities[entity];
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

            this.addDelayedUpdate(Op.RemoveComponent,entity,pool,link.ItemId);
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

        public getStates():EcsWorldStats
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
                        break;
                    case Op.SafeRemoveEntity:
                        break;
                    case Op.AddComponent:
                        break;
                    case Op.RemoveComponent:
                        break;
                    case Op.UpdateComponent:
                        break;
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