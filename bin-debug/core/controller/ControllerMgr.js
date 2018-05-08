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
var ControllerMgr = (function (_super) {
    __extends(ControllerMgr, _super);
    function ControllerMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_ctrlPool = {};
        return _this;
    }
    ControllerMgr.prototype.getCtrl = function (c) {
        var k = c["name"];
        if (!this.m_ctrlPool[k]) {
            this.m_ctrlPool[k] = new c();
        }
        return this.m_ctrlPool[k];
    };
    ControllerMgr.prototype.show = function (c) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ctrl = this.getCtrl(c);
        ctrl.show(args);
    };
    ControllerMgr.prototype.hide = function (c) {
        var ctrl = this.getCtrl(c);
        ctrl.hide();
    };
    ControllerMgr.prototype.getCtrollerModel = function (c) {
        var ctrl = this.getCtrl(c);
        return ctrl.Model;
    };
    return ControllerMgr;
}(Single));
__reflect(ControllerMgr.prototype, "ControllerMgr");
//# sourceMappingURL=ControllerMgr.js.map