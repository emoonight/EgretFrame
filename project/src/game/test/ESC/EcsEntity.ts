module ecs
{
    export class EcsEntity
    {
        public IsReserved:boolean;
        public Mask:EcsComponentMask=new EcsComponentMask();
        public ComponentsCount:number;
        public Components:ComponentsLink[] = new Array<ComponentsLink>(8);  
    }
}