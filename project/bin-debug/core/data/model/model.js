var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model = (function () {
    function Model($ctrl) {
        this.m_ctrl = $ctrl;
        this.m_ctrl.Model = this;
    }
    return Model;
}());
__reflect(Model.prototype, "Model");
//# sourceMappingURL=model.js.map