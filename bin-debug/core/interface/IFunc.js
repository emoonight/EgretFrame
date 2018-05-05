var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FuncTest = (function () {
    function FuncTest() {
        //限制函数的实现
        this.f = function (ob, content) { };
    }
    return FuncTest;
}());
__reflect(FuncTest.prototype, "FuncTest");
function getCounter() {
    var c = function (index) { };
    c.update = function () { };
    return c;
}
//# sourceMappingURL=IFunc.js.map