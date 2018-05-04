var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var DelayedUpdate = (function () {
        function DelayedUpdate($type, $entity, $component, $componentId) {
            this.Type = $type;
            this.Entity = $entity;
            this.Pool = $component;
            this.ComponentId = $componentId;
        }
        return DelayedUpdate;
    }());
    ecs.DelayedUpdate = DelayedUpdate;
    __reflect(DelayedUpdate.prototype, "ecs.DelayedUpdate");
})(ecs || (ecs = {}));
