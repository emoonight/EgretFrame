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
var View = (function (_super) {
    __extends(View, _super);
    function View(ctl) {
        var _this = _super.call(this) || this;
        //自定义索引器
        _this.m_events = {};
        _this.tickIndex = -1; //
        _this.m_ctl = ctl;
        return _this;
    }
    View.prototype.addEvent = function (type, ob) {
        if ("undefined" === typeof (this.m_events[type]))
            this.m_events[type] = [];
        this.m_events[type].push(ob);
    };
    View.prototype.removeEvents = function () {
        for (var k in this.m_events) {
            while (this.m_events[k].length > 0)
                this.m_events[k].pop();
            delete this.m_events[k];
        }
    };
    View.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.registerEvents();
    };
    View.prototype.hide = function () {
        this.removeEvents();
        this.dispose();
    };
    return View;
}(egret.DisplayObjectContainer));
__reflect(View.prototype, "View", ["IDispose", "IRun"]);
