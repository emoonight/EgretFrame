var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var List = (function () {
    function List() {
        this.m_count = 0;
    }
    List.prototype.add = function (node) {
        if (!this.contains(node))
            this[this.m_count++] = node;
        else
            console.warn("List had this node....");
    };
    List.prototype.remove = function (node) {
        var pos;
        for (var i = 0; i < this.m_count; i++)
            if (this[i] === node) {
                pos = i;
                break;
            }
        for (var j = pos; j < this.m_count - 1; j++) {
            this[j] = this[j + 1];
        }
        delete this[--this.m_count];
    };
    List.prototype.insert = function (node, pos) {
        if (pos > this.m_count || pos < 0)
            console.warn("pos is out of range...");
        for (var i = this.m_count; i > pos; i--)
            this[i] = this[i - 1];
        this[pos] = node;
        this.m_count++;
    };
    List.prototype.contains = function (node) {
        for (var i = 0; i < this.m_count; i++)
            if (this[i] === node)
                return true;
        return false;
    };
    List.prototype.clear = function () {
        while (this.m_count > 0)
            delete this[--this.m_count];
    };
    Object.defineProperty(List.prototype, "count", {
        get: function () {
            return this.m_count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "values", {
        get: function () {
            var retArr = [];
            for (var i = 0; i < this.m_count; i++)
                retArr.push(this[i]);
            return retArr;
        },
        enumerable: true,
        configurable: true
    });
    return List;
}());
__reflect(List.prototype, "List", ["IList"]);
