var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ecs;
(function (ecs) {
    var MinSize = 8;
    var EcsComponentPool = (function (_super) {
        __extends(EcsComponentPool, _super);
        function EcsComponentPool() {
            var _this = _super.call(this) || this;
            _this.Items = new Array(MinSize);
            _this.m_reservedItems = new Array(MinSize);
            _this.m_typeIndex = ecs.EcsHelpers.ComponentsCount++;
            return _this;
        }
        EcsComponentPool.prototype.requestNewId = function () {
            var id;
            if (this.m_reservedItemsCount > 0)
                id = this.m_reservedItems[--this.m_reservedItemsCount];
            else {
                id = this.m_itemsCount;
                if (this.m_itemsCount == this.Items.length)
                    this.Items = ArrayUtils.resize(this.Items, this.m_itemsCount << 1);
                this.Items[this.m_itemsCount++] = this.m_creator != undefined
                    ? new this.m_creator() : this.m_creator.prototype();
            }
            return id;
        };
        EcsComponentPool.prototype.recycleById = function (id) {
            if (this.m_reservedItemsCount == this.m_reservedItems.length)
                this.m_reservedItems = ArrayUtils.resize(this.m_reservedItems, this.m_reservedItemsCount << 1);
            this.m_reservedItems[this.m_reservedItemsCount++] = id;
        };
        EcsComponentPool.prototype.getExistItemById = function (idx) {
            return this.Items[idx];
        };
        EcsComponentPool.prototype.getComponentTypeIndex = function () {
            return this.m_typeIndex;
        };
        EcsComponentPool.prototype.setCreator = function (c) {
            this.m_creator = c;
        };
        EcsComponentPool.prototype.shrink = function () {
            var newSize = ecs.EcsHelpers.getPowerOfTwoSize(this.m_itemsCount < MinSize
                ? MinSize : this.m_itemsCount);
            if (newSize < this.Items.length)
                this.Items = ArrayUtils.resize(this.Items, newSize);
            if (this.m_reservedItems.length > MinSize) {
                this.m_reservedItems = new Array(MinSize);
                this.m_reservedItemsCount = 0;
            }
        };
        return EcsComponentPool;
    }(Single));
    ecs.EcsComponentPool = EcsComponentPool;
    __reflect(EcsComponentPool.prototype, "ecs.EcsComponentPool", ["ecs.IEcsComponentPool"]);
})(ecs || (ecs = {}));
