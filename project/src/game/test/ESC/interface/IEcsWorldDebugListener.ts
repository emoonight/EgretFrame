module ecs
{
    export interface IEcsWorldDebugListener
    {
        onEntityCreated($entity:number):void;
        onEntityRemoved($entity:number):void;
        onComponentAdded($entity:number,$component:any):void;
        onComponentRemoved($entity:number,$component:any):void;
    }

}