module ecs
{
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
}