abstract class  View extends egret.DisplayObjectContainer implements IDispose,IRun
{
    //自定义索引器
    private m_events:{[key:string]:Array<Observer>}={};

    public tickIndex:number=-1;    //
    
    protected m_ctl:Controller;

    abstract update(time:number);
    abstract dispose();

    constructor(ctl:Controller)
    {
        super();
        this.m_ctl = ctl;
    }

    protected  addEvent(type:string,ob:Observer)
    {
        if("undefined" === typeof(this.m_events[type]))
            this.m_events[type] = [];
        
        this.m_events[type].push(ob);
    }

    protected abstract registerEvents();

    protected removeEvents()
    {
        for(let k in this.m_events)
        {
            while(this.m_events[k].length>0)
                this.m_events[k].pop();
            
            delete this.m_events[k]
        }
    }

    public show(...args)
    {
        this.registerEvents();
    }

    public  hide()
    {
        this.removeEvents();
        this.dispose();
    }

}