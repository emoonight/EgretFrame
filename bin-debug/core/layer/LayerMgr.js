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
    LayerMgr.prototype.addLayer = function (type, stage) {
        LayerMgr.s_instance[type] = new Layer(type);
        stage.addChild(LayerMgr.s_instance[type]);
    };
    LayerMgr.prototype.removeLayer = function (type) {
        if (this[type] && this[type].parent) {
            this[type].parent.removeChild(this[type]);
            delete this[type];
        }
    };
    LayerMgr.prototype.init = function (stage) {
        this.addLayer(LayerType.SCENE, stage);
        this.addLayer(LayerType.ENTITY, stage);
        this.addLayer(LayerType.EFFECT, stage);
        this.addLayer(LayerType.UI, stage);
    };
    LayerMgr.prototype.getLayer = function (type) {
        return this[type];
    };
    return LayerMgr;
}());
__reflect(LayerMgr.prototype, "LayerMgr");
var LayerType;
(function (LayerType) {
    LayerType[LayerType["SCENE"] = 0] = "SCENE";
    LayerType[LayerType["ENTITY"] = 1] = "ENTITY";
    LayerType[LayerType["EFFECT"] = 2] = "EFFECT";
    LayerType[LayerType["UI"] = 3] = "UI";
    LayerType[LayerType["POP"] = 4] = "POP";
    LayerType[LayerType["GUID"] = 5] = "GUID"; //指引
})(LayerType || (LayerType = {}));
