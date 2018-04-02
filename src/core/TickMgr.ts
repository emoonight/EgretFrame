class TickMgr
{
    private m_tickQueue:Dictionary<View>;
    private m_curTime:number;


    constructor()
    {
        this.m_tickQueue = new Dictionary<View>();
        egret.ticker.$startTick(this.onTick,this);
    }


    private onTick(time:number):boolean
    {
        if(this.m_tickQueue.Count > 0 )
        {
            for(let key in this.m_tickQueue)
                this.m_tickQueue[key].update(time);   

            return true;
        }
        return false;
    }

    //插入刷新队列
    public addTick(v:View)
    {
        let index = v.tickIndex;
        let vk = v.tickIndex.toString();
        if(this.m_tickQueue.containsKey(vk))
        {
            
        }

    }

}