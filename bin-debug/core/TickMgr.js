var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TickMgr = (function () {
    function TickMgr() {
        this.m_tickQueue = new Dictionary();
        egret.ticker.$startTick(this.onTick, this);
    }
    TickMgr.prototype.onTick = function (time) {
        if (this.m_tickQueue.Count > 0) {
            for (var key in this.m_tickQueue)
                this.m_tickQueue[key].update(time);
            return true;
        }
        return false;
    };
    //插入刷新队列
    TickMgr.prototype.addTick = function (v) {
        var index = v.tickIndex;
        var vk = v.tickIndex.toString();
        if (this.m_tickQueue.containsKey(vk)) {
        }
    };
    return TickMgr;
}());
__reflect(TickMgr.prototype, "TickMgr");
