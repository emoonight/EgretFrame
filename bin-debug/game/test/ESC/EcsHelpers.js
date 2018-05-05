var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsHelpers = (function () {
        function EcsHelpers() {
        }
        EcsHelpers.getPowerOfTwoSize = function (n) {
            if (n < 2)
                return 2;
            n--;
            n = n | (n >> 1);
            n = n | (n >> 2);
            n = n | (n >> 4);
            n = n | (n >> 8);
            n = n | (n >> 16);
            return n + 1;
        };
        EcsHelpers.ComponentsCount = 0;
        return EcsHelpers;
    }());
    ecs.EcsHelpers = EcsHelpers;
    __reflect(EcsHelpers.prototype, "ecs.EcsHelpers");
})(ecs || (ecs = {}));
//# sourceMappingURL=EcsHelpers.js.map