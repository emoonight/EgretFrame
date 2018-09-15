
interface IList<T>
{
    [index:number]:T;
    add(node:T):void;
    remove(node:T):void;
    insert(node:T,pos:number):void;
    contains(node:T):boolean;
    clear():void;
    count:number;
}

class List<T> implements IList<T>
{
    [index:number]:T;
    protected m_count:number=0;


    public add(node:T):void
    {
        if(!this.contains(node))
            this[this.m_count++] = node;
        else
            console.warn("List had this node....");
    }

    public remove(node:T):void
    {
        let pos:number;        
        for(let i = 0 ; i < this.m_count ; i++)
            if(this[i] === node)
            {
                pos = i;
                break;
            }
        
        
        for(let j = pos ; j < this.m_count -1 ; j++)
        {
            this[j]=this[j+1];
        }

        delete this[--this.m_count];
    }

    public insert(node:T,pos:number):void
    {
        if(pos > this.m_count || pos < 0)
            console.warn("pos is out of range...");

        for(let i = this.m_count ; i > pos ; i--)
            this[i] = this[i-1];
        
        this[pos] = node;
        this.m_count++;
    }
    
    public contains(node:T):boolean
    {
        for(let i = 0 ; i < this.m_count ; i++)
            if(this[i] === node)
                return true;

        return false;
    }


    public clear():void
    {
        while(this.m_count > 0)
            delete this[--this.m_count];
    }

    public get count():number
    {
        return this.m_count;
    }

    public get values():T[]
    {
        let retArr:Array<T> = [];
        for(let i = 0 ; i < this.m_count ; i++)
            retArr.push(this[i])

        return retArr;
    }
    
}