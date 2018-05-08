class ArrayUtils
{
    public static resize<T>(sArr:Array<T>,size:number):Array<T>
    {
        let arr:Array<T> =new Array<T>(size);
        for(let i = 0 ; i < arr.length ; i++)
            arr[i]=sArr[i];
        
        return arr;
    }

    /**
     * 
     * @param sArr 源数组
     * @param sIndex 源下标
     * @param tArr  目标数组
     * @param tIndex 目标下标
     * @param size 大小
     */
    public static copy<T>(sArr:Array<T>,sIndex:number,tArr:Array<T>,tIndex,size)
    {
        let i = sIndex ,j=tIndex;
        let slen = sArr.length,tlen=tArr.length;
        for(;i<slen&&j<tlen;i++,j++)
            tArr[j]=sArr[i];

        return sArr;
    }

    
}