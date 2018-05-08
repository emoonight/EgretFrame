var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsWorldStats = (function () {
        function EcsWorldStats($active, $reserved, $filters, $components) {
            this.ActiveEntities = $active;
            this.ReservedEntities = $reserved;
            this.Filters = $filters;
            this.Components = $components;
        }
        return EcsWorldStats;
    }());
    ecs.EcsWorldStats = EcsWorldStats;
    __reflect(EcsWorldStats.prototype, "ecs.EcsWorldStats");
})(ecs || (ecs = {}));
//# sourceMappingURL=EcsWorldStats.js.map