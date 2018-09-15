class Emitter{
    private static m_listener={};

    constructor(){
    }

    //事件注册
    public static Register(name:string,callback:Function,context:any)
    {
        let observers:Observer[] = Emitter.m_listener[name];
        if(!observers)
        {
            Emitter.m_listener[name]=[];
        }

        Emitter.m_listener[name].push(new Observer(callback,context));
    }

    //事件移除
    public static Remove(name:string,callback:Function,context:any)
    {
        let observers:Observer[]=Emitter.m_listener[name];
        if(!observers) return;

        let len=observers.length;
        for(let i=0;i<len;i++)
        {
            let obs=observers[i];
            if(obs.Compare(context))
            {
               observers.splice(i,1);
               break;                     
            }
        }

        if(observers.length==0)
        {
            delete Emitter.m_listener[name];                
        }
    }

    //发送
    public static Send(name:string,...args:any[])
    {
        let observers:Observer[]=Emitter.m_listener[name];
        if(!observers) return;
        let len=observers.length;

        for(let i=0;i<len;i++)
        {
            let obs=observers[i];
            obs.Notify(...args);
        }
    }

}