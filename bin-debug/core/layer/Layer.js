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
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(layer) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = true;
        _this.m_layer = layer;
        return _this;
    }
    Object.defineProperty(Layer.prototype, "Layer", {
        get: function () {
            return this.m_layer;
        },
        enumerable: true,
        configurable: true
    });
    return Layer;
}(egret.DisplayObjectContainer));
__reflect(Layer.prototype, "Layer");
//# sourceMappingURL=Layer.js.map