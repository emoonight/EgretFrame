var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    var EcsFilter = (function () {
        function EcsFilter(include, exclude) {
            this.Entities = new Array(32);
            this.m_listeners = new Array(4);
            this.IncludeMask = include;
            this.ExcludeMask = exclude;
        }
        EcsFilter.prototype.addListener = function ($listener) {
            if ($listener == undefined) {
                console.warn('$listener is undefined');
                return;
            }
            for (var i = 0; i < this.m_listenersCount; i++) {
                if (this.m_listeners[i] == $listener) {
                    console.warn('$listener is added');
                    return;
                }
            }
            if (this.m_listenersCount == this.m_listeners.length)
                ArrayUtils.resize(this.m_listeners, this.m_listenersCount << 1);
            this.m_listeners[this.m_listenersCount++] = $listener;
        };
        EcsFilter.prototype.removeListener = function ($listener) {
            if ($listener != null) {
                for (var i = this.m_listenersCount - 1; i >= 0; i--) {
                    if (this.m_listeners[i] == $listener) {
                        this.m_listenersCount--;
                        ArrayUtils.copy(this.m_listeners, i + 1, this.m_listeners, i, this.m_listenersCount);
                        break;
                    }
                }
            }
        };
        EcsFilter.prototype.raiseOnAddEvent = function (entity, reason) {
            if (this.Entities.length == this.EntitiesCount)
                this.Entities = ArrayUtils.resize(this.Entities, this.EntitiesCount << 1);
            this.Entities[this.EntitiesCount++] = entity;
            for (var i = 0; i < this.m_listenersCount; i++)
                this.m_listeners[i].onFilterEntityAdded(entity, reason);
        };
        EcsFilter.prototype.raiseOnRemoveEvent = function (entity, reason) {
            var i = this.EntitiesCount - 1;
            for (; i >= 0; i--)
                if (this.Entities[i] == entity)
                    break;
            if (i = -1) {
                this.EntitiesCount--;
                ArrayUtils.copy(this.Entities, i + 1, this.Entities, i, this.EntitiesCount - i);
            }
            for (var i_1 = 0; i_1 < this.m_listenersCount; i_1++)
                this.m_listeners[i_1].onFilterEntityRemoved(entity, reason);
        };
        EcsFilter.prototype.raiseOnUpdateEvent = function (entity, reason) {
            for (var i = 0; i < this.m_listenersCount; i++)
                this.m_listeners[i].onFilterEntityUpdated(entity, reason);
        };
        EcsFilter.prototype.toString = function () {
            return StringUtils.format("Filter(+{0} -{1})", this.IncludeMask, this.ExcludeMask);
        };
        return EcsFilter;
    }());
    ecs.EcsFilter = EcsFilter;
    __reflect(EcsFilter.prototype, "ecs.EcsFilter");
})(ecs || (ecs = {}));
