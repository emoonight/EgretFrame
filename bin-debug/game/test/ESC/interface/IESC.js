var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ecs;
(function (ecs) {
    /**                                                       */
    var Op;
    (function (Op) {
        Op[Op["RemoveEntity"] = 1] = "RemoveEntity";
        Op[Op["SafeRemoveEntity"] = 2] = "SafeRemoveEntity";
        Op[Op["AddComponent"] = 3] = "AddComponent";
        Op[Op["RemoveComponent"] = 4] = "RemoveComponent";
        Op[Op["UpdateComponent"] = 5] = "UpdateComponent";
    })(Op = ecs.Op || (ecs.Op = {}));
    var EcsWorld = (function () {
        function EcsWorld() {
            this.m_componentPoolFilters = new Array(512);
            this.m_entities = new Array(1024);
            this.m_reservedEntities = new Array(256);
            this.m_delayedUpdates = new Array(1024);
            this.m_delayedUpdatesCount = 0;
            this.m_filters = new Array(64);
            this.m_delayedOpMask = new ecs.EcsComponentMask();
            this.m_debugListeners = new List();
        }
        EcsWorld.registerComponentCreator = function ($creator) {
            ecs.EcsComponentPool.Instance().setCreator($creator);
        };
        EcsWorld.ShrinkComponentPool = function () {
            ecs.EcsComponentPool.Instance().shrink();
        };
        //#region  debug
        EcsWorld.prototype.addDebugListener = function ($observer) {
            if (this.m_debugListeners.contains($observer)) {
                console.warn("listener already exists");
                return;
            }
            this.m_debugListeners.add($observer);
        };
        EcsWorld.prototype.removeDebugListener = function ($observer) {
            this.m_debugListeners.remove($observer);
        };
        //#endregion
        EcsWorld.prototype.createEntity = function () {
            return this.createEntityInternal(true);
        };
        EcsWorld.prototype.createrEntityWith = function () {
            return this.addComponent(this.createEntityInternal(false));
        };
        EcsWorld.prototype.removeEntity = function ($entity) {
            if (this.m_entities[$entity].IsReserved)
                this.addDelayedUpdate(Op.RemoveEntity, $entity, null, -1);
        };
        EcsWorld.prototype.reserveEntity = function (entity, entityData) {
            entityData.IsReserved = true;
            if (this.m_reservedEntitiesCount == this.m_reservedEntities.length)
                this.m_reservedEntities = ArrayUtils.resize(this.m_reservedEntities, this.m_reservedEntitiesCount << 1);
            this.m_reservedEntities[this.m_reservedEntitiesCount++] = entity;
            //#region  debug
            for (var ii = 0; ii < this.m_debugListeners.count; ii++)
                this.m_debugListeners[ii].onEntityRemoved(entity);
            //#endregion
        };
        EcsWorld.prototype.getComponent = function ($entity) {
            var entityData = this.m_entities[$entity];
            var pool = ecs.EcsComponentPool.Instance();
            var link;
            // link.ItemId
            var i = entityData.ComponentsCount - 1;
            for (; i >= 0; i--) {
                link = entityData.Components[i];
                if (link.Pool == pool)
                    break;
            }
            return i != -1 ? pool.Items[link.ItemId] : null;
        };
        EcsWorld.prototype.getComponents = function (entity, list) {
            if (list != null) {
                list.clear();
                var entityData = this.m_entities[entity];
                for (var i = 0; i < entityData.ComponentsCount; i++) {
                    var link = entityData.Components[i];
                    list.add(link.Pool.getExistItemById(link.ItemId));
                }
            }
            return list;
        };
        EcsWorld.prototype.addComponent = function ($entity) {
            var entityData = this.m_entities[$entity];
            var pool = ecs.EcsComponentPool.Instance();
            //#region  debug
            var i = entityData.ComponentsCount - 1;
            for (; i >= 0; i--) {
                if (entityData.Components[i].Pool === pool)
                    break;
            }
            if (i != -1)
                console.warn("component is already exists on enetity");
            //#endregion
            var link = new ecs.ComponentsLink(pool, pool.requestNewId());
            if (entityData.ComponentsCount == entityData.Components.length)
                entityData.Components = ArrayUtils.resize(entityData.Components, entityData.ComponentsCount << 1);
            entityData.Components[entityData.ComponentsCount++] = link;
            this.addDelayedUpdate(Op.AddComponent, $entity, pool, link.ItemId);
            //#region  debug
            var component = pool.Items[link.ItemId];
            for (var ii = 0; ii < this.m_debugListeners.count; ii++)
                this.m_debugListeners[ii].onComponentAdded($entity, component);
            //#endregion
            return pool.Items[link.ItemId];
        };
        EcsWorld.prototype.removeComponent = function ($entity) {
            var entityData = this.m_entities[$entity];
            var pool = ecs.EcsComponentPool.Instance();
            var link;
            link.ItemId = -1;
            var i = entityData.ComponentsCount - 1;
            for (; i >= 0; i--) {
                link = entityData.Components[i];
                if (link.Pool == pool)
                    break;
            }
            //#region 
            if (i == -1) {
                console.warn("component not exists on entity");
            }
            //#endregion
            this.addDelayedUpdate(Op.RemoveComponent, $entity, pool, link.ItemId);
            entityData.ComponentsCount--;
            ArrayUtils.copy(entityData.Components, i + 1, entityData.Components, i, entityData.ComponentsCount - 1);
        };
        EcsWorld.prototype.updateComponent = function (entity) {
            var entityData = this.m_entities[entity];
            var pool = ecs.EcsComponentPool.Instance();
            var link;
            var i = entityData.ComponentsCount - 1;
            for (; i >= 0; i--) {
                link = entityData.Components[i];
                if (link.Pool == pool)
                    break;
            }
            //#region  debug
            if (i == -1)
                console.warn('compoonent not exists on entity ');
            //#endregion
            var typeId = ecs.EcsComponentPool.Instance().getComponentTypeIndex();
            if (typeId < this.m_componentPoolFilters.length
                && this.m_componentPoolFilters[typeId] != undefined) {
                this.addDelayedUpdate(Op.UpdateComponent, entity, pool, link.ItemId);
            }
        };
        EcsWorld.prototype.getStats = function () {
            return new ecs.EcsWorldStats(this.m_entitiesCount - this.m_reservedEntitiesCount, this.m_reservedEntitiesCount, this.m_filtersCount, ecs.EcsHelpers.ComponentsCount);
        };
        EcsWorld.prototype.processDelayedUpdates = function (level) {
            if (level === void 0) { level = 0; }
            var iMax = this.m_delayedUpdatesCount;
            for (var i = 0; i < iMax; i++) {
                var op = this.m_delayedUpdates[i];
                var entityData = this.m_entities[op.Entity];
                this.m_delayedOpMask.copyFrom(entityData.Mask);
                switch (op.Type) {
                    case Op.RemoveEntity:
                        //#region 
                        if (entityData.IsReserved)
                            console.warn("Entity already removed");
                        //#endregion
                        while (entityData.ComponentsCount > 0) {
                            var link = entityData.Components[entityData.ComponentsCount - 1];
                            var componentId = link.Pool.getComponentTypeIndex();
                            entityData.Mask.setBit(componentId, false);
                            var componentToRemove = link.Pool.getExistItemById(link.ItemId);
                            //#region  debug
                            for (var ii = 0; ii < this.m_debugListeners.count; ii++)
                                this.m_debugListeners[ii].onComponentRemoved(op.Entity, componentToRemove);
                            //#endregion
                            this.updateFilters(op.Entity, componentToRemove, this.m_delayedOpMask, entityData.Mask);
                            link.Pool.recycleById(link.ItemId);
                            this.m_delayedOpMask.setBit(componentId, false);
                            entityData.ComponentsCount--;
                        }
                        this.reserveEntity(op.Entity, entityData);
                        break;
                    case Op.SafeRemoveEntity:
                        if (!entityData.IsReserved && entityData.ComponentsCount == 0)
                            this.reserveEntity(op.Entity, entityData);
                        break;
                    case Op.AddComponent:
                        var bit = op.Pool.getComponentTypeIndex();
                        //#region debug
                        if (entityData.Mask.getBit(bit))
                            console.warn('cant add component on entity');
                        //#endregion
                        entityData.Mask.setBit(bit, true);
                        this.updateFilters(op.Entity, op.Pool.getExistItemById(op.ComponentId), this.m_delayedOpMask, entityData.Mask);
                        break;
                    case Op.RemoveComponent:
                        var bitRemove = op.Pool.getComponentTypeIndex();
                        var componentInstance = op.Pool.getExistItemById(op.ComponentId);
                        if (!entityData.Mask.getBit(bitRemove))
                            console.warn('cant remove component on entity');
                        for (var ii = 0; ii < this.m_debugListeners.count; i++)
                            this.m_debugListeners[ii];
                        entityData.Mask.setBit(bitRemove, false);
                        this.updateFilters(op.Entity, componentInstance, this.m_delayedOpMask, entityData.Mask);
                        op.Pool.recycleById(op.ComponentId);
                        if (entityData.ComponentsCount == 0)
                            this.addDelayedUpdate(Op.SafeRemoveEntity, op.Entity, null, -1);
                        break;
                    case Op.UpdateComponent:
                        var filterList = this.m_componentPoolFilters[op.Pool.getComponentTypeIndex()];
                        var componentToUpdate = op.Pool.getExistItemById(op.ComponentId);
                        for (var filterId = 0; filterId < filterList.Count; filterId++) {
                            var filter = filterList.Filters[filterId];
                            if (filter.ExcludeMask.BitsCount == 0 || !this.m_delayedOpMask.isIntersects(filter.ExcludeMask))
                                filter.raiseOnUpdateEvent(op.Entity, componentToUpdate);
                        }
                        break;
                }
                if (iMax > 0) {
                    if (this.m_delayedUpdatesCount == iMax)
                        this.m_delayedUpdatesCount = 0;
                    else {
                        this.m_delayedUpdates = ArrayUtils.copy(this.m_delayedUpdates, iMax, this.m_delayedUpdates, 0, this.m_delayedUpdatesCount - iMax);
                        this.m_delayedUpdatesCount -= iMax;
                        //#region  debug
                        if (level > 0)
                            console.warn('Recursive updating in filters');
                        //#endregion
                        this.processDelayedUpdates(level + 1);
                    }
                }
            }
        };
        EcsWorld.prototype.fillFilter = function (filter) {
            for (var i = 0; i < this.m_entitiesCount; i++) {
                var entity = this.m_entities[i];
                if (!entity.IsReserved && entity.Mask.isCompatible(filter)) {
                    if (filter.Entities.length == filter.EntitiesCount)
                        filter.Entities = ArrayUtils.resize(filter.Entities, filter.EntitiesCount << 1);
                    filter.Entities[filter.EntitiesCount++] = i;
                }
            }
        };
        EcsWorld.prototype.getFilter = function (include, exclude, shouldBeFilled) {
            //#region  debug
            if (include == null)
                console.warn('ArgumentNulllException include');
            if (exclude == null)
                console.warn('ArgumentNulllException exclude');
            //#endregion
            var i = this.m_filtersCount - 1;
            for (; i >= 0; i--) {
                if (this.m_filters[i].IncludeMask.isEquals(include)
                    && this.m_filters[i].ExcludeMask.isEquals(exclude))
                    break;
            }
            if (i == -1) {
                i = this.m_filtersCount;
                var filter = new ecs.EcsFilter(include, exclude);
                if (shouldBeFilled)
                    this.fillFilter(filter);
                if (this.m_filtersCount == this.m_filters.length)
                    this.m_filters = ArrayUtils.resize(this.m_filters, this.m_filtersCount << 1);
                this.m_filters[this.m_filtersCount++] = filter;
                for (var bit = 0; bit < include.BitsCount; bit++) {
                    var typeId = include.Bits[bit];
                    if (typeId == this.m_componentPoolFilters.length)
                        this.m_componentPoolFilters = ArrayUtils.resize(this.m_componentPoolFilters, ecs.EcsHelpers.getPowerOfTwoSize(typeId + 1));
                    var filterList = this.m_componentPoolFilters[typeId];
                    if (filterList == undefined) {
                        filterList = new ecs.EcsFilterList();
                        this.m_componentPoolFilters[typeId] = filterList;
                    }
                    if (filterList.Count == filterList.Filters.length)
                        filterList.Filters = ArrayUtils.resize(filterList.Filters, filterList.Count << 1);
                    filterList.Filters[filterList.Count++] = filter;
                }
            }
            return this.m_filters[i];
        };
        EcsWorld.prototype.updateFilters = function (entity, component, oldMask, newMask) {
            for (var i = this.m_filtersCount - 1; i >= 0; i--) {
                var filter = this.m_filters[i];
                var isNewMaskCompatible = newMask.isCompatible(filter);
                if (oldMask.isCompatible(filter)) {
                    if (!isNewMaskCompatible) {
                        //#region  debug
                        var ii = filter.EntitiesCount - 1;
                        for (; ii >= 0; ii--) {
                            if (filter.Entities[ii] == entity)
                                break;
                        }
                        if (ii == -1)
                            console.warn('entity should be in filter');
                        filter.raiseOnRemoveEvent(entity, component);
                        //#endregion 
                    }
                }
                else {
                    if (isNewMaskCompatible)
                        filter.raiseOnAddEvent(entity, component);
                }
            }
        };
        EcsWorld.prototype.createEntityInternal = function ($addSafeRemove) {
            var entity;
            if (this.m_reservedEntitiesCount > 0) {
                this.m_reservedEntitiesCount--;
                entity = this.m_reservedEntities[this.m_reservedEntitiesCount];
                this.m_entities[entity].IsReserved = false;
            }
            else {
                entity = this.m_entitiesCount;
                if (this.m_entitiesCount == this.m_entities.length)
                    this.m_entities = ArrayUtils.resize(this.m_entities, this.m_entitiesCount << 1);
                this.m_entities[this.m_entitiesCount++] = new ecs.EcsEntity();
            }
            if ($addSafeRemove)
                this.addDelayedUpdate(Op.SafeRemoveEntity, entity, null, -1);
            for (var ii = 0; ii < this.m_debugListeners.count; ii++)
                this.m_debugListeners[ii].onEntityCreated(entity);
            return entity;
        };
        EcsWorld.prototype.addDelayedUpdate = function ($type, $entity, $component, $componentId) {
            if (this.m_delayedUpdatesCount == this.m_delayedUpdates.length)
                this.m_delayedUpdates = ArrayUtils.resize(this.m_delayedUpdates, this.m_delayedUpdatesCount << 1);
            this.m_delayedUpdates[this.m_delayedUpdatesCount++] = new ecs.DelayedUpdate($type, $entity, $component, $componentId);
        };
        return EcsWorld;
    }());
    ecs.EcsWorld = EcsWorld;
    __reflect(EcsWorld.prototype, "ecs.EcsWorld", ["ecs.IEcsReadOnlyWorld"]);
})(ecs || (ecs = {}));
//# sourceMappingURL=IESC.js.map