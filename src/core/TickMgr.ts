class TickMgr
{
    private m_tickQueue:View[];
    private m_curTime:number;

    constructor()
    {
        this.m_tickQueue = [];
        egret.ticker.$startTick(this.onTick,this);
    }


    private onTick(time:number):boolean
    {
        if(this.m_tickQueue.length > 0 )
        {
            let len = this.m_tickQueue.length;
            for(let i = 0 ; i < len ; i ++)
                this.m_tickQueue[i].update(time); //需要一个时间差去做判断 帧行为

            return true;
        }
        return false;
    }

    public addTick(v:View)
    {
        if(v.tickIndex == 0 )
        {
            
        }
    }

}