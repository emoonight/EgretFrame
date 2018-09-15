class StringUtils
{
    /**
     * 字符格式化,以后需要改进正则表达式验证{?}
     * @param  多参数第一个参数是用来替换的表达式
     */
    public static format(...$args):string
    {
        let f:string = $args.shift();
        let fArr = f.split("}");

        let len = fArr.length ; 
        for(let i = 0 ; i < len ; i++)
        {
            if(i < $args.length)
                f=f.replace('{'+i+'}',$args[i]);
            else
                f=f.replace('{'+i+'}',"");
        }
        return f;
    }
}