var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsComponentMask = (function () {
        function EcsComponentMask() {
            this.Bits = [4];
        }
        EcsComponentMask.prototype.toString = function () {
            var str = "[";
            for (var i = 0; i < this.BitsCount; i++)
                str = StringUtils.format('{0}{1}{2}', str, i > 0 ? "," : "", this.Bits[0]);
            return str + "]";
        };
        EcsComponentMask.prototype.setBit = function ($bitId, $state) {
            var i = this.BitsCount - 1;
            for (; i >= 0; i--)
                if (this.Bits[i] == $bitId)
                    break;
            if ($state) {
                if (i == -1) {
                    if (this.BitsCount == this.Bits.length)
                        this.Bits = ArrayUtils.resize(this.Bits, this.BitsCount << 1);
                    this.Bits[this.BitsCount++] = $bitId;
                }
                else {
                    if (i != -1) {
                        this.BitsCount--;
                        ArrayUtils.copy(this.Bits, i + 1, this.Bits, i, this.BitsCount - i);
                    }
                }
            }
        };
        EcsComponentMask.prototype.isEmpty = function () {
            return this.BitsCount == 0;
        };
        EcsComponentMask.prototype.getBit = function ($bitId) {
            var i = this.BitsCount - 1;
            for (; i >= 0; i--)
                if (this.Bits[i] == $bitId)
                    break;
            return i != -1;
        };
        EcsComponentMask.prototype.copyFrom = function ($mask) {
            this.BitsCount = $mask.BitsCount;
            if (this.Bits.length < this.BitsCount)
                this.Bits = new Array($mask.Bits.length);
            ArrayUtils.copy($mask.Bits, 0, this.Bits, 0, this.BitsCount);
        };
        EcsComponentMask.prototype.isEquals = function ($mask) {
            if (this.BitsCount != $mask.BitsCount)
                return false;
            for (var i = 0; i < this.BitsCount; i++) {
                var j = $mask.BitsCount - 1;
                var bit = this.Bits[i];
                for (; j >= 0; j--) {
                    if ($mask.Bits[j] == bit)
                        break;
                }
                if (j == -1)
                    return false;
            }
            return true;
        };
        EcsComponentMask.prototype.isCompatible = function ($filter) {
            if (this.BitsCount > 0 && $filter.IncludeMask.BitsCount <= this.BitsCount) {
                var i = $filter.IncludeMask.BitsCount - 1;
                var maxJ = this.BitsCount - 1;
                for (; i >= 0; i--) {
                    var j = maxJ;
                    var bit = $filter.IncludeMask.Bits[i];
                    for (; j >= 0; j--) {
                        if (this.Bits[j] == bit)
                            break;
                    }
                    if (j == -1)
                        return !this.isIntersects($filter.ExcludeMask);
                }
            }
            return false;
        };
        EcsComponentMask.prototype.isIntersects = function ($mask) {
            if (this.BitsCount > 0 && $mask.BitsCount > 0) {
                for (var i = 0; i < this.BitsCount; i++) {
                    var bit = this.Bits[i];
                    for (var j = 0; j < $mask.BitsCount; j++) {
                        if ($mask.Bits[j] == bit)
                            return true;
                    }
                }
            }
            return false;
        };
        return EcsComponentMask;
    }());
    ecs.EcsComponentMask = EcsComponentMask;
    __reflect(EcsComponentMask.prototype, "ecs.EcsComponentMask");
})(ecs || (ecs = {}));
