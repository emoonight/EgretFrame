abstract class  View extends egret.DisplayObjectContainer implements IDispose,IRun
{
    private m_events:{[key:string]:Array<Observer>}={};

    public tickIndex:number;    //
    
    protected m_ctl:Controller;

    abstract update(time:number);
    abstract dispose();

    protected  addEvent(type:string,ob:Observer)
    {
        if("undefined" === typeof(this.m_events[type]))
            this.m_events[type] = [];
        
        this.m_events[type].push(ob);
    }

    protected abstract registerEvents();

    protected removeEvents()
    {

    }

    public show()
    {

    }

    public  hide()
    {
        this.removeEvents();
        this.dispose();
    }

}