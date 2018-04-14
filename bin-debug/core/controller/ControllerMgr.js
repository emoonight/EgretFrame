var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ControllerMgr = (function () {
    function ControllerMgr() {
        this.m_ctrlPool = {};
    }
    Object.defineProperty(ControllerMgr, "Instance", {
        get: function () {
            if (ControllerMgr.s_instance == null)
                ControllerMgr.s_instance = new ControllerMgr();
            return ControllerMgr.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    ControllerMgr.prototype.show = function (c) {
        var ctl = new c();
        return ctl;
    };
    return ControllerMgr;
}());
__reflect(ControllerMgr.prototype, "ControllerMgr");
//# sourceMappingURL=ControllerMgr.js.map