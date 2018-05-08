var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Heap = (function () {
    function Heap() {
        this.arr = [];
    }
    Heap.prototype.swap = function (i, j) {
    };
    Heap.prototype.add = function () {
        return this;
    };
    return Heap;
}());
__reflect(Heap.prototype, "Heap");
//# sourceMappingURL=Heap.js.map