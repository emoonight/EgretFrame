module ecs
{
    const MinSize = 8;

    export interface IEscComponentPool
    {
        getExistItemById(idx:number);
        recycleById(id:number):void;
        getComponentTypeIndex():number;
    }

    export class EcsComponentPool<T> extends Single implements IEscComponentPool
    {
        public Items:T[] = new Array<T>(MinSize);
        
        private m_typeIndex:number;
        private m_reservedItems =new Array<number>(MinSize);

        private m_itemsCount:number;
        private m_reservedItemsCount:number;

        private m_creator:{new():T};

        constructor()
        {
            super();
            this.m_typeIndex = EcsHelpers.ComponentsCount++;
        }

        public requestNewId()
        {
            let id:number;
            if(this.m_reservedItemsCount > 0 )
                id = this.m_reservedItems[--this.m_reservedItemsCount];
            else
            {
                id = this.m_itemsCount;
                if(this.m_itemsCount == this.Items.length)
                    this.Items = ArrayUtils.resize(this.Items,this.m_itemsCount << 1);
                this.Items[this.m_itemsCount++] = this.m_creator != undefined 
                            ? new this.m_creator(): this.m_creator.prototype();
            }

            return id;
        }


        public recycleById(id:number):void
        {
            if(this.m_reservedItemsCount == this.m_reservedItems.length)
                this.m_reservedItems = ArrayUtils.resize(this.m_reservedItems,this.m_reservedItemsCount<<1);
            
            this.m_reservedItems[this.m_reservedItemsCount++] = id;
        }

        public getExistItemById(idx:number):any
        {
            return this.Items[idx];
        }

        public getComponentTypeIndex():number
        {
            return this.m_typeIndex;
        }

        public setCreator(c:{new():T}):void
        {
            this.m_creator = c;
        }

        public shrink():void
        {
            let newSize = EcsHelpers.getPowerOfTwoSize(this.m_itemsCount < MinSize 
                    ? MinSize : this.m_itemsCount);
            if(newSize < this.Items.length)
                this.Items = ArrayUtils.resize(this.Items,newSize);
            
            if(this.m_reservedItems.length > MinSize)
            {
                this.m_reservedItems = new Array<number>(MinSize)
                this.m_reservedItemsCount = 0;
            }

        }
    }
}

