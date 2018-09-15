/**
 * 场景显示节点 类型 障碍，可击碎，可点击，奖励品
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridNode = (function () {
    function GridNode(index, type, parent) {
        this.SIZE = 100;
        this.ENTITY_ARR = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00];
        this.m_state = false;
        this.m_type = type;
        this.m_currShape = new egret.Shape();
        this.m_currShape.width = this.SIZE;
        this.m_currShape.height = this.SIZE;
        this.m_currShape.x = (index % 5) * this.SIZE;
        this.m_currShape.y = Math.floor(index / 5) * this.SIZE;
        this.m_currShape.graphics.beginFill(this.ENTITY_ARR[type]);
        this.m_currShape.graphics.drawRoundRect(0, 0, this.SIZE, this.SIZE, 20);
        this.m_currShape.graphics.endFill();
        parent.addChild(this.m_currShape);
        this.m_currShape.touchEnabled = true;
        this.m_currShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    Object.defineProperty(GridNode.prototype, "state", {
        get: function () {
            return this.m_state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridNode.prototype, "x", {
        get: function () {
            return this.m_currShape.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridNode.prototype, "y", {
        get: function () {
            return this.m_currShape.y;
        },
        enumerable: true,
        configurable: true
    });
    GridNode.prototype.onTouch = function () {
        switch (this.m_type) {
            case 0:
                Emitter.Send(Message.PASS_LEVEL);
                break;
            case 1:
                break;
            case 2:
                this.m_currShape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this.m_currShape.graphics.beginFill(0xffffff);
                this.m_currShape.graphics.drawRoundRect(0, 0, this.SIZE, this.SIZE, 20);
                this.m_currShape.graphics.endFill();
                this.m_state = true;
                break;
        }
    };
    return GridNode;
}());
__reflect(GridNode.prototype, "GridNode");
