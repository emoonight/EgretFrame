var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TickMgr = (function () {
    function TickMgr() {
        this.m_curTime = 0;
        this.m_currIndex = 0;
    }
    Object.defineProperty(TickMgr, "Instance", {
        get: function () {
            if (TickMgr.s_instance == null)
                TickMgr.s_instance = new TickMgr();
            return TickMgr.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    TickMgr.prototype.start = function () {
        egret.ticker.$startTick(this.onTick, this);
    };
    TickMgr.prototype.stop = function () {
        egret.ticker.$stopTick(this.onTick, this);
    };
    TickMgr.prototype.onTick = function (time) {
        if (this.m_currIndex > 0) {
            var now = Date.now();
            for (var k in this) {
                var gap = now - this.m_curTime;
                if (gap > 0) {
                    this[k].update(gap);
                    this.m_curTime = now;
                    return true;
                }
            }
        }
        return false;
    };
    //插入刷新队列
    TickMgr.prototype.addTick = function (run) {
        if (run.tickIndex >= this.m_currIndex || run.tickIndex < 0) {
            run.tickIndex = this.m_currIndex++;
            this[this.m_currIndex] = run;
        }
        else {
            this.m_currIndex++;
            for (var i = this.m_currIndex; i > run.tickIndex; i--) {
                this[i] = this[i - 1];
                this[i].tickIndex++;
            }
            this[run.tickIndex] = run;
        }
    };
    TickMgr.prototype.removeTick = function (run) {
        if (this.m_currIndex > 0) {
            for (var i = 0; i < this.m_currIndex; i++) {
                var ir = this[i];
                if (typeof ir === typeof run && ir.tickIndex == run.tickIndex) {
                    this.m_currIndex--;
                    delete this[i];
                    return true;
                }
            }
        }
        return false;
    };
    return TickMgr;
}());
__reflect(TickMgr.prototype, "TickMgr");
//# sourceMappingURL=TickMgr.js.map