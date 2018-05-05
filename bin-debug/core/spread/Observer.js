var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Observer = (function () {
    function Observer(callback, context) {
        this.m_callBack = null;
        this.m_context = null;
        this.m_callBack = callback;
        this.m_context = context;
    }
    Observer.prototype.Notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.m_callBack).call.apply(_a, [this.m_context].concat(args));
        var _a;
    };
    Observer.prototype.Compare = function (context) {
        return context == this.m_context;
    };
    return Observer;
}());
__reflect(Observer.prototype, "Observer");
//# sourceMappingURL=Observer.js.map