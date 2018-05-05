var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.resize = function (sArr, size) {
        var arr = new Array(size);
        for (var i = 0; i < arr.length; i++)
            arr[i] = sArr[i];
        return arr;
    };
    /**
     *
     * @param sArr 源数组
     * @param sIndex 源下标
     * @param tArr  目标数组
     * @param tIndex 目标下标
     * @param size 大小
     */
    ArrayUtils.copy = function (sArr, sIndex, tArr, tIndex, size) {
        var i = sIndex, j = tIndex;
        var slen = sArr.length, tlen = tArr.length;
        for (; i < slen && j < tlen; i++, j++)
            tArr[j] = sArr[i];
        return sArr;
    };
    return ArrayUtils;
}());
__reflect(ArrayUtils.prototype, "ArrayUtils");
//# sourceMappingURL=ArrayUtils.js.map