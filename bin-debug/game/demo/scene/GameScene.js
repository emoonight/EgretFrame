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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.m_grids = [];
        for (var i = 0; i < 30; i++) {
            var node = new GridNode(i, _this.getLayer(LayerType.Sc_Entity));
            _this.m_grids.push(node);
        }
        return _this;
    }
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
