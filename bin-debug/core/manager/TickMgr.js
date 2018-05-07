var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TickMgr = (function (_super) {
    __extends(TickMgr, _super);
    function TickMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_curTime = 0;
        _this.m_currIndex = 0;
        return _this;
    }
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
            this[this.m_currIndex] = run;
            run.tickIndex = this.m_currIndex++;
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
}(Single));
__reflect(TickMgr.prototype, "TickMgr");
