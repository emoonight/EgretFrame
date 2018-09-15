class MathUtils
{
    /**
     * 随机生成一个整数
     * @param min  最小值
     * @param max  最大值
     */
    public static random(min:number,max:number):number
    {
       return Math.floor(Math.random()*(max-min+1)+min); 
    }

    /**
     * 在start 到 end 之间取值生成len 个数
     * @param len 个数
     * @param start 起始值
     * @param end 结束值
     */
    public static randomRange(len:number,start:number,end:number):number[]
    {
        let arr:number[] =[];
        let inner = (start,end)=>{
            let span = end - start;
            return Math.floor(Math.random() * span + start);
        }

        while(arr.length < len)
        {
            let num = inner(start,end)
            if(arr.indexOf(num) == -1)
                arr.push(num);
        }

        return arr;
    }

    public static sort(pre,next):number
    {
        return pre > next ? 1 : -1
    }
}