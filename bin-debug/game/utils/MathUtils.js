var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtils = (function () {
    function MathUtils() {
    }
    /**
     * 随机生成一个整数
     * @param min  最小值
     * @param max  最大值
     */
    MathUtils.RandomRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
