var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "ScMgr", {
        get: function () { return SceneManger.Instance(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "tkMrg", {
        get: function () { return TickMgr.Instance(); },
        enumerable: true,
        configurable: true
    });
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map