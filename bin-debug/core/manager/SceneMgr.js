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
var SceneMgr = (function (_super) {
    __extends(SceneMgr, _super);
    function SceneMgr() {
        var _this = _super.call(this) || this;
        _this.m_sceneMap = {};
        return _this;
    }
    SceneMgr.prototype.register = function ($key, scene) {
        this.m_sceneMap[$key] = scene;
    };
    SceneMgr.prototype.runScene = function ($key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var nowScene = new this.m_sceneMap[$key]();
        if (!nowScene) {
            console.warn("key " + $key + " 未注册");
            return;
        }
        if (this.m_currScene)
            this.m_currScene.scene.onExit();
        nowScene.onEnter.apply(nowScene, param);
        this.m_currScene = { key: $key, scene: nowScene };
    };
    SceneMgr.prototype.clear = function () {
        if (this.m_currScene) {
            this.m_currScene.scene.onExit();
            this.m_currScene = undefined;
        }
        this.m_sceneMap = {};
    };
    Object.defineProperty(SceneMgr.prototype, "CurrSceneId", {
        get: function () {
            return this.m_currScene.key;
        },
        enumerable: true,
        configurable: true
    });
    SceneMgr.prototype.getCurrScene = function () {
        return this.m_currScene.scene;
    };
    return SceneMgr;
}(Single));
__reflect(SceneMgr.prototype, "SceneMgr");
