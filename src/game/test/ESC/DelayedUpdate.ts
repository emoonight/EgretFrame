module ecs
{
    export class DelayedUpdate
    {
        public Type:Op;
        public Entity:number;
        public Pool:IEcsComponentPool;
        public ComponentId:number;

        public constructor($type:Op,$entity:number,$component:IEcsComponentPool,$componentId:number)
        {
            this.Type = $type;
            this.Entity = $entity;
            this.Pool = $component;
            this.ComponentId = $componentId;
        }
    }

}