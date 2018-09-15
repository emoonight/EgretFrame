module ecs
{
    export interface IEcsFilterListener
    {
        onFilterEntityAdded($entity:number,$reason:any):void;
        onFilterEntityRemoved($entity:number,$reason:any):void;
        onFilterEntityUpdated($entity:number,$reason:any):void;
    }
}