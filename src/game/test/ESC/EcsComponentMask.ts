module ecs 
{
    export class EcsComponentMask
    {
        public Bits:number[] =[4];
        public BitsCount:number;

        public toString():string
        {
            let str = "[";

            for(let i = 0 ; i < this.BitsCount ; i++)
                str = StringUtils.format('{0}{1}{2}',str,i>0 ? ",":"",this.Bits[0]);

            return str+"]"
        }

        public setBit($bitId:number,$state:boolean)
        {
            let i = this.BitsCount - 1;
            for(; i >= 0;i--)
                if(this.Bits[i] == $bitId)
                    break;

            if($state)
            {
                if(i == -1)
                {
                    if(this.BitsCount == this.Bits.length)
                        this.Bits = ArrayUtils.resize(this.Bits,this.BitsCount<<1);
                    
                    this.Bits[this.BitsCount++]=$bitId;
                }
                else
                {
                    if(i != -1)
                    {
                        this.BitsCount--;
                        ArrayUtils.copy(this.Bits,i+1,this.Bits,i,this.BitsCount-i);
                    }
                }
            }
        }

        public isEmpty():boolean
        {
            return this.BitsCount == 0;
        }

        public getBit($bitId:number):boolean
        {
            let i = this.BitsCount - 1;
            for(;i >= 0 ; i--)
                if(this.Bits[i] == $bitId)
                    break;

            return i != -1;
        }   

        public copyFrom($mask:EcsComponentMask)
        {
            this.BitsCount = $mask.BitsCount;
            if(this.Bits.length < this.BitsCount)
                this.Bits = new Array<number>($mask.Bits.length);

            ArrayUtils.copy($mask.Bits,0,this.Bits,0,this.BitsCount);
        }

        public isEquals($mask:EcsComponentMask):boolean
        {
            if(this.BitsCount != $mask.BitsCount)
                return false;
            
            for(let i = 0 ; i <this.BitsCount ; i++)
            {
                let j = $mask.BitsCount - 1;
                let bit = this.Bits[i];
                for(;j>=0;j--)
                {
                    if($mask.Bits[j]==bit)
                        break;
                }

                if(j==-1)
                    return false;
            }
            return true;
        }

        public isCompatible($filter:EcsFilter)
        {
            if(this.BitsCount > 0 && $filter.IncludeMask.BitsCount<=this.BitsCount)
            {
                let i = $filter.IncludeMask.BitsCount - 1;
                let maxJ = this.BitsCount - 1;
                for(; i>=0;i--)
                {
                    let j = maxJ;
                    let bit = $filter.IncludeMask.Bits[i];
                    for(;j>=0;j--)
                    {
                        if(this.Bits[j]==bit)
                            break;
                    }

                    if(j== -1)
                        return !this.isIntersects($filter.ExcludeMask);
                }
            }

            return false;
        }

        public isIntersects($mask:EcsComponentMask):boolean
        {
            if(this.BitsCount>0 && $mask.BitsCount >0)
            {
                for(let i = 0 ; i< this.BitsCount; i++)
                {
                    let bit = this.Bits[i];
                    for(let j =0;j<$mask.BitsCount;j++)
                    {
                        if($mask.Bits[j] == bit)
                            return true;
                    }
                }
            }
            return false;
        }

    }
    
}