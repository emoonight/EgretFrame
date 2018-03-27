var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Action = (function () {
    function Action(func, content) {
        this.func = func;
        this.content = content;
    }
    Action.prototype.run = function () {
        this.func.apply(this.content);
    };
    return Action;
}());
__reflect(Action.prototype, "Action");
//# sourceMappingURL=Action.js.map