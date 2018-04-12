class TickMgr
{
    [order:number]:IRun;

    private static s_instance:TickMgr;
    public static get Instance():TickMgr
    {
        if(TickMgr.s_instance == null)
            TickMgr.s_instance = new TickMgr();
        return TickMgr.s_instance;        
    }


    private m_curTime:number=0;
    private m_currIndex=0;

    public start()
    {
        egret.ticker.$startTick(this.onTick,this);
    }


    public stop()
    {
        egret.ticker.$stopTick(this.onTick,this);
    }

    private onTick(time:number):boolean
    {
        if(this.m_currIndex > 0)
        {
            let now = Date.now();
            for(let k in this)
            {
                let gap = now - this.m_curTime;
                if(gap > 0)
                {
                    this[k].update(gap);
                    this.m_curTime = now;
                    return true;
                }
            }
        }

        return false;
    }

    //插入刷新队列
    public addTick(run:IRun)
    {
        if(run.tickIndex >= this.m_currIndex || run.tickIndex < 0)
        {
            run.tickIndex = this.m_currIndex++;
            this[this.m_currIndex]=run;
        }
        else
        {
            this.m_currIndex++;
            for(let i = this.m_currIndex; i > run.tickIndex;i--)
            {
                this[i] = this[i-1];
                this[i].tickIndex++;
            }
            this[run.tickIndex]=run;
        }
    }


    public removeTick(run:IRun):boolean
    {
        if(this.m_currIndex > 0)
        {
            for(let i = 0 ; i < this.m_currIndex ; i++)
            {
                let ir = this[i];

                if(typeof ir === typeof run && ir.tickIndex == run.tickIndex)
                {
                    this.m_currIndex --;
                    delete this[i];
                    return true;
                }
            }
        }

        return false;
    }

}