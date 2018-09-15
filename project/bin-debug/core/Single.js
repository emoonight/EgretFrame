var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Single = (function () {
    function Single() {
    }
    Single.Instance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var clz = this;
        if (!clz.m_instance) {
            switch (args.length) {
                case 0:
                    clz.m_instance = new clz();
                    break;
                case 1:
                    clz.m_instance = new clz(args[0]);
                    break;
                case 2:
                    clz.m_instance = new clz(args[0], args[1]);
                    break;
                case 3:
                    clz.m_instance = new clz(args[0], args[1], args[2]);
                    break;
                case 4:
                    clz.m_instance = new clz(args[0], args[1], args[2], args[4]);
                    break;
            }
        }
        return clz.m_instance;
    };
    return Single;
}());
__reflect(Single.prototype, "Single");
