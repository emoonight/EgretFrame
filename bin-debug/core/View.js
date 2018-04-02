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
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_events = {};
        return _this;
    }
    View.prototype.addEvent = function (type, ob) {
        if ("undefined" === typeof (this.m_events[type]))
            this.m_events[type] = [];
        this.m_events[type].push(ob);
    };
    View.prototype.removeEvents = function () {
    };
    View.prototype.show = function () {
    };
    View.prototype.hide = function () {
        this.removeEvents();
        this.dispose();
    };
    return View;
}(egret.DisplayObjectContainer));
__reflect(View.prototype, "View", ["IDispose", "IRun"]);
//# sourceMappingURL=View.js.map