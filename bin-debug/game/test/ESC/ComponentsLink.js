var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var ComponentsLink = (function () {
        function ComponentsLink($pool, $itemId) {
            this.Pool = $pool;
            this.ItemId = $itemId;
        }
        return ComponentsLink;
    }());
    ecs.ComponentsLink = ComponentsLink;
    __reflect(ComponentsLink.prototype, "ecs.ComponentsLink");
})(ecs || (ecs = {}));
//# sourceMappingURL=ComponentsLink.js.map