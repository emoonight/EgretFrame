
class Action
{
    public func:Function;
    public content:any

    constructor(func:Function,content:any)
    {
        this.func = func;
        this.content = content;
    }

    public run()
    {
        this.func.apply(this.content);
    }
}