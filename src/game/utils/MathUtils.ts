class MathUtils
{
    /**
     * 随机生成一个整数
     * @param min  最小值
     * @param max  最大值
     */
    public static RandomRange(min:number,max:number):number
    {
       return Math.floor(Math.random()*(max-min+1)+min); 
    }
}