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
var WGLScene = (function (_super) {
    __extends(WGLScene, _super);
    function WGLScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WGLScene.prototype.onEnter = function (id) {
        _super.prototype.onEnter.call(this, id);
        var flag = egret.WebGLUtils.checkCanUseWebGL();
    };
    return WGLScene;
}(Scene));
__reflect(WGLScene.prototype, "WGLScene");
