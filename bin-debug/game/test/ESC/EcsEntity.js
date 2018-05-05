var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsEntity = (function () {
        function EcsEntity() {
            this.Mask = new ecs.EcsComponentMask();
            this.Components = new Array(8);
        }
        return EcsEntity;
    }());
    ecs.EcsEntity = EcsEntity;
    __reflect(EcsEntity.prototype, "ecs.EcsEntity");
})(ecs || (ecs = {}));
//# sourceMappingURL=EcsEntity.js.map