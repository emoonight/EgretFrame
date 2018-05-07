/**
 * 场景显示节点 类型 障碍，可击碎，可点击，奖励品
 */

class GridNode 
{
    readonly SIZE:number = 100;
    readonly ENTITY_ARR:number[] =[0xFF0000,0x00FF00,0x0000FF,0xFFFF00];
    
    private m_currShape:egret.Shape;


    constructor(index:number,type:number,parent:egret.DisplayObjectContainer)
    {
        this.m_currShape =new egret.Shape();

        let x = (index % 5) * this.SIZE;
        let y = Math.floor(index / 5 ) * this.SIZE;

        this.m_currShape.graphics.beginFill(this.ENTITY_ARR[type]);
        this.m_currShape.graphics.drawRect(x,y,this.SIZE,this.SIZE);
        this.m_currShape.graphics.endFill();
        parent.addChild(this.m_currShape);

    }

}