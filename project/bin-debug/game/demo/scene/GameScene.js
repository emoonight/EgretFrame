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
        return _this;
    }
    GameScene.prototype.renderNodes = function () {
        var arr = this.createNode();
        for (var i = 0; i < 30; i++) {
            var node = new GridNode(i, arr[i], this.getLayer(LayerType.Sc_Effect));
            this.m_grids.push(node);
        }
    };
    GameScene.prototype.onEnter = function (id) {
        _super.prototype.onEnter.call(this, id);
        this.renderNodes();
        Emitter.Register(Message.PASS_LEVEL, this.onPassLevel, this);
    };
    GameScene.prototype.createNode = function () {
        var len = 30;
        var arr = new Array(30);
        var seed = MathUtils.random(0, 29);
        arr[seed] = 0;
        var shop = 0;
        while (shop < 2) {
            seed = MathUtils.random(0, 29);
            if (arr[seed] == void 0) {
                arr[seed] = 1;
                shop++;
            }
        }
        for (var i = 0; i < len; i++)
            if (arr[i] == void 0)
                arr[i] = 2;
        return arr;
    };
    GameScene.prototype.onPassLevel = function () {
        if (this.m_grids.filter(function (node) {
            return node.state;
        }).length >= 27) {
            this.clearNodes();
            this.renderNodes();
        }
    };
    GameScene.prototype.clearNodes = function () {
        this.m_grids.forEach(function (node) {
            node = void 0;
        });
        this.m_grids = [];
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map