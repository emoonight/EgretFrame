module ecs
{
    export class ComponentsLink
    {
        public Pool:IEcsComponentPool;
        public ItemId:number;

        constructor($pool:IEcsComponentPool,$itemId:number)
        {
            this.Pool = $pool;
            this.ItemId = $itemId;
        }
    }
}