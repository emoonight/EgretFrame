class Observer
{
    private m_callBack:Function=null;
    private m_context:any=null;

    constructor(callback:Function,context:any)
    {
        this.m_callBack=callback;
        this.m_context=context;
    }

    public Notify(...args:any[])
    {
        this.m_callBack.call(this.m_context,...args);
    }

    public Compare(context:any)
    {
        return context==this.m_context;        
    }
}