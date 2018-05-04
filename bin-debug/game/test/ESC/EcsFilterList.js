var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsFilterList = (function () {
        function EcsFilterList() {
            this.Filters = new Array(4);
        }
        return EcsFilterList;
    }());
    ecs.EcsFilterList = EcsFilterList;
    __reflect(EcsFilterList.prototype, "ecs.EcsFilterList");
})(ecs || (ecs = {}));
