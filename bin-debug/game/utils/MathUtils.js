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
    MathUtils.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * 在start 到 end 之间取值生成len 个数
     * @param len 个数
     * @param start 起始值
     * @param end 结束值
     */
    MathUtils.randomRange = function (len, start, end) {
        var arr = [];
        var inner = function (start, end) {
            var span = end - start;
            return Math.floor(Math.random() * span + start);
        };
        while (arr.length < len) {
            var num = inner(start, end);
            if (arr.indexOf(num) == -1)
                arr.push(num);
        }
        return arr;
    };
    MathUtils.sort = function (pre, next) {
        return pre > next ? 1 : -1;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
