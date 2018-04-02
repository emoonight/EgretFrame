var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerMgr = (function () {
    function LayerMgr() {
    }
    Object.defineProperty(LayerMgr, "Instance", {
        get: function () {
            if (LayerMgr.s_instance == null)
                LayerMgr.s_instance = new LayerMgr();
            return LayerMgr.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    LayerMgr.prototype.addLayer = function () {
    };
    return LayerMgr;
}());
__reflect(LayerMgr.prototype, "LayerMgr");
