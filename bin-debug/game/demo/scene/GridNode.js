/**
 * 场景显示节点 类型 障碍，可击碎，可点击，奖励品
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridNode = (function () {
    function GridNode(index, parent) {
        this.SIZE = 100;
        this.ENTITY_ARR = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00];
        this.m_currShape = new egret.Shape();
        var x = (index % 5) * this.SIZE;
        var y = Math.floor(index / 5) * this.SIZE;
        var num = MathUtils.RandomRange(0, 3);
        console.log("随机数是---》" + num);
        this.m_currShape.graphics.beginFill(this.ENTITY_ARR[num]);
        this.m_currShape.graphics.drawRect(x, y, this.SIZE, this.SIZE);
        this.m_currShape.graphics.endFill();
        parent.addChild(this.m_currShape);
    }
    return GridNode;
}());
__reflect(GridNode.prototype, "GridNode");
