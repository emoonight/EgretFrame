var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary(init) {
        this.m_keys = [];
        this.m_values = [];
        if ("undefined" !== typeof init) {
            var len = init.length;
            for (var i = 0; i < len; i++) {
                this[init[i].key] = init[i].value;
                this.m_keys.push(init[i].key);
                this.m_values.push(init[i].value);
            }
        }
    }
    Object.defineProperty(Dictionary.prototype, "Count", {
        get: function () {
            return this.m_keys.length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.add = function (key, value) {
        this[key] = value;
        this.m_keys.push(key);
        this.m_values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this.m_keys.indexOf(key, 0);
        this.m_keys.splice(index, 1);
        this.m_values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined")
            return false;
        return true;
    };
    Dictionary.prototype.clear = function () {
        var len = this.m_keys.length;
        for (var i = 0; i < len; i++)
            delete this[this.m_keys[i]];
        this.m_keys = [];
        this.m_values = [];
    };
    Dictionary.prototype.keys = function () {
        return this.m_keys;
    };
    Dictionary.prototype.values = function () {
        return this.m_values;
    };
    Dictionary.prototype.toLookUp = function () {
        return this;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary", ["IDictionary"]);
