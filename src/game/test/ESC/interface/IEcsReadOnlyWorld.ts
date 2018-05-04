module ecs
{
    export interface IEcsReadOnlyWorld
    {
        getComponent<T>($entity:number):T;
    }

}