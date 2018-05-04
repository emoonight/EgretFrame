var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * 字符格式化,以后需要改进正则表达式验证{?}
     * @param  多参数第一个参数是用来替换的表达式
     */
    StringUtils.format = function () {
        var $args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            $args[_i] = arguments[_i];
        }
        var f = $args.shift();
        var fArr = f.split("}");
        var len = fArr.length;
        for (var i = 0; i < len; i++) {
            if (i < $args.length)
                f = f.replace('{' + i + '}', $args[i]);
            else
                f = f.replace('{' + i + '}', "");
        }
        return f;
    };
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
