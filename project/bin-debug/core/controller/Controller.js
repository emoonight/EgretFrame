var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Controller = (function () {
    function Controller() {
    }
    Object.defineProperty(Controller.prototype, "Model", {
        get: function () {
            return this.m_model;
        },
        set: function ($md) {
            this.m_model = $md;
        },
        enumerable: true,
        configurable: true
    });
    return Controller;
}());
__reflect(Controller.prototype, "Controller", ["IDispose"]);
//# sourceMappingURL=Controller.js.map