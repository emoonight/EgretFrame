//keyof 索引类型查询操作符
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//exmaple2
var clsAA = (function () {
    function clsAA() {
    }
    return clsAA;
}());
__reflect(clsAA.prototype, "clsAA");
var ak;
var av;
//交叉类型
function merge(a, b) {
    var retVal = {};
    for (var k in a)
        retVal[k] = a[k];
    for (var o in b)
        retVal[o] = b[o];
    return retVal;
}
var person = { id: 1, name: "messi", age: 15 };
var pickNameAndAge = pick(person, "name", "age");
function getDD(dd) {
    switch (dd.id) {
        case 1:
            //do sth
            break;
        case 2:
        case 3:
            break;
    }
}
//# sourceMappingURL=TsType.js.map