interface IDictionary<T>
{
    add(key:string,value:any):void;
    remove(key:string):void;
    containsKey(key:string):Boolean;
    keys():string[];
    values():T[];
}

class Dictionary<T> implements IDictionary<T>{
    
    m_keys:string[]=[];
    m_values:T[]=[];

    constructor(init?:{key:string,value:T}[]){
        if("undefined"!==typeof init)
        {
            let len=init.length;
            for(let i=0;i<len;i++)
            {
                this[init[i].key]=init[i].value;
                this.m_keys.push(init[i].key);
                this.m_values.push(init[i].value);
            }
        }
    }

    public add(key:string,value:T):void
    {
        this[key]=value;
        this.m_keys.push(key);
        this.m_values.push(value);
    }

    public remove(key:string):void
    {
            var index=this.m_keys.indexOf(key,0);
            this.m_keys.splice(index,1);
            this.m_values.splice(index,1);

            delete this[key];
    }

    public containsKey(key:string):boolean
    {
        if(typeof this[key]==="undefined") return false;
        return true;
    }

    public clear():void
    {
        let len=this.m_keys.length;
        for(let i =0; i < len ; i++)
            delete this[this.m_keys[i]];

        this.m_keys=[];
        this.m_values=[];
    }

    public keys():string[]
    {
        return this.m_keys;
    }

    public values():T[]
    {
        return this.m_values;
    }

    public toLookUp():IDictionary<T>
    {
        return this;
    }
}