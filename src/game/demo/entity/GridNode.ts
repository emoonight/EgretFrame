/**
 * 场景显示节点 类型 障碍，可击碎，可点击，奖励品
 */

class GridNode 
{
    readonly SIZE:number = 100;
    readonly ENTITY_ARR:number[] =[0xFF0000,0x00FF00,0x0000FF,0xFFFF00];
    
    protected m_currShape:egret.Shape;
    protected m_type:number;
    protected m_state:boolean = false;

    public get state():boolean
    {
        return this.m_state;
    }

    public get x()
    {
        return this.m_currShape.x;
    }

    public get y()
    {
        return this.m_currShape.y;
    }

    constructor(index:number,type:number,parent:egret.DisplayObjectContainer)
    {
        this.m_type = type;
        this.m_currShape =new egret.Shape();
        this.m_currShape.width = this.SIZE;
        this.m_currShape.height = this.SIZE;

        this.m_currShape.x =  (index % 5) * this.SIZE;
        this.m_currShape.y = Math.floor(index / 5 ) * this.SIZE;

        this.m_currShape.graphics.beginFill(this.ENTITY_ARR[type]);
        this.m_currShape.graphics.drawRoundRect(0,0,this.SIZE,this.SIZE,20);
        this.m_currShape.graphics.endFill();
        parent.addChild(this.m_currShape);
        this.m_currShape.touchEnabled = true;

        this.m_currShape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }

    private onTouch()
    {
        switch(this.m_type)
        {
            case 0:
                Emitter.Send(Message.PASS_LEVEL);
                break;
            case 1:
                break;
            case 2:
                this.m_currShape.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
                this.m_currShape.graphics.beginFill(0xffffff);
                this.m_currShape.graphics.drawRoundRect(0,0,this.SIZE,this.SIZE,20);
                this.m_currShape.graphics.endFill();
                this.m_state = true;
                break;
        }
    }
}