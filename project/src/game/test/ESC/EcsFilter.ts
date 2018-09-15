module ecs
{
    export class EcsFilter
    {
        public readonly IncludeMask:EcsComponentMask;
        public readonly ExcludeMask:EcsComponentMask;
        
        public Entities:number[] = new Array<number>(32);
        
        public EntitiesCount:number;
        
        private m_listeners:IEcsFilterListener[] =new Array<IEcsFilterListener>(4);
        private m_listenersCount:number;
        
        constructor(include:EcsComponentMask,exclude:EcsComponentMask)
        {
            this.IncludeMask = include;
            this.ExcludeMask = exclude;
        }

        public addListener($listener:IEcsFilterListener):void
        {
            if($listener == undefined)
            {
                console.warn('$listener is undefined');
                return;
            }

            for(let i = 0 ; i< this.m_listenersCount ; i++)
            {
                if(this.m_listeners[i]==$listener)
                {
                    console.warn('$listener is added');
                    return;
                }
            }

            if(this.m_listenersCount == this.m_listeners.length)
                ArrayUtils.resize(this.m_listeners,this.m_listenersCount<<1);
            
            this.m_listeners[this.m_listenersCount++]=$listener;
        }

        public removeListener($listener:IEcsFilterListener):void
        {
            if($listener != null)
            {
                for(let i = this.m_listenersCount-1; i>=0;i--)
                {
                    if(this.m_listeners[i] == $listener)
                    {
                        this.m_listenersCount--;
                        ArrayUtils.copy(this.m_listeners,i+1,this.m_listeners,i,this.m_listenersCount);
                        break;
                    }  
                }
            }
        }

        public raiseOnAddEvent(entity:number,reason:any):void
        {
            if(this.Entities.length == this.EntitiesCount)
                this.Entities=ArrayUtils.resize(this.Entities,this.EntitiesCount<<1);

            this.Entities[this.EntitiesCount++]=entity;

            for(let i = 0; i < this.m_listenersCount;i++)
                this.m_listeners[i].onFilterEntityAdded(entity,reason);
        }

        public raiseOnRemoveEvent(entity:number,reason:any):void
        {
            let i = this.EntitiesCount - 1;
            for(;i>=0;i--)
                if(this.Entities[i]==entity)
                    break;
            
            if(i ! = -1)
            {
                this.EntitiesCount--;
                ArrayUtils.copy(this.Entities,i+1,this.Entities,i,this.EntitiesCount-i);
            }

            for(let i = 0 ; i < this.m_listenersCount; i++)
                this.m_listeners[i].onFilterEntityRemoved(entity,reason);
        }

        public raiseOnUpdateEvent(entity:number,reason:any):void
        {
            for(let i = 0 ; i < this.m_listenersCount;i++)
                this.m_listeners[i].onFilterEntityUpdated(entity,reason);
        }

        public toString():string
        {
            return StringUtils.format("Filter(+{0} -{1})", this.IncludeMask, this.ExcludeMask)
        }

    }

}