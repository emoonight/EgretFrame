var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景基类
 */
var Scene = (function () {
    function Scene() {
        this.m_layers = {};
        this.m_autoReleaseResource = [];
        this.Stage = new egret.DisplayObjectContainer();
        this.Stage.touchEnabled = false;
        this.Stage.touchChildren = true;
        this.Stage.touchEnabled = true;
        this.m_isInit = false;
        this.m_releaseResource = true;
        this.addLayer(LayerType.Sc_Bg);
        this.addLayer(LayerType.Sc_Terren);
        this.addLayer(LayerType.Sc_Entity);
        this.addLayer(LayerType.Sc_Effect);
    }
    Scene.prototype.init = function ($sceneId) {
        if ($sceneId === void 0) { $sceneId = undefined; }
        this.m_isInit = true;
        this.SceneId = $sceneId;
    };
    Scene.prototype.autoRes = function (resName) {
        this.m_autoReleaseResource.push(resName);
        return RES.getRes(resName);
    };
    Scene.prototype.onEnter = function ($sceneId) {
        if (!($sceneId == this.SceneId && this.m_isInit))
            this.init(this.SceneId);
        this.addSceneToStage();
    };
    Scene.prototype.onExit = function () {
    };
    Scene.prototype.addLayer = function ($type) {
        var layer = new Layer($type);
        this.m_layers[$type] = layer;
        var stage = this.Stage;
        var isTop = true;
        for (var i = 0; i < stage.numChildren; ++i) {
            var child = stage.getChildAt(i);
            if (child && ($type < child.Layer)) {
                stage.addChildAt(layer, i);
                isTop = false;
                break;
            }
        }
        if (isTop)
            stage.addChild(layer);
    };
    Scene.prototype.getLayer = function ($type) {
        return this.m_layers[$type];
    };
    Scene.prototype.addSceneToStage = function () {
        App.stageUt.getStage().addChildAt(this.Stage, 0);
    };
    Scene.prototype.removeSceneFromStage = function () {
        App.stageUt.getStage().removeChild(this.Stage);
    };
    Scene.prototype.dispose = function () {
        this.m_autoReleaseResource.forEach(function (url) {
            RES.destroyRes(url);
        });
    };
    return Scene;
}());
__reflect(Scene.prototype, "Scene", ["IDispose"]);
//# sourceMappingURL=Scene.js.map