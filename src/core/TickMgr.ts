class TickMgr
{
    
    [order:number]:IRun;
    
    private m_curTime:number;
    private m_currIndex=0;

    constructor()
    {
        egret.ticker.$startTick(this.onTick,this);
    }


    private onTick(time:number):boolean
    {
        
        if(this.m_currIndex > 0)
        {
            let now = Date.now();
            for(let i = 0 ; i < this.m_currIndex ; i++)
            {
                let gap = now - this.m_curTime;
                if(gap > 0)
                {
                    this[i].update(gap);
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
            run.tickIndex = ++this.m_currIndex;
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

}