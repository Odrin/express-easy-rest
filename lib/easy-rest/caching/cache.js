"use strict";
var cache_item_1 = require("./cache-item");
var cache_item_removed_reason_1 = require("./cache-item-removed-reason");
var cache_item_removed_event_emitter_1 = require("./cache-item-removed-event-emitter");
var instance = null;
var Cache = (function () {
    function Cache() {
        this._map = new Map();
        this._pollingInterval = Cache.defaultPollingInterval;
        this._cacheItemRemovedEventEmitter = new cache_item_removed_event_emitter_1.CacheItemRemovedEventEmitter();
        this.initPollingInterval();
    }
    Object.defineProperty(Cache, "instance", {
        get: function () {
            if (instance === null) {
                instance = new Cache();
            }
            return instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache, "defaultPollingInterval", {
        get: function () {
            return 60 * 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache.prototype, "pollingInterval", {
        get: function () {
            return this._pollingInterval;
        },
        set: function (value) {
            this._pollingInterval = value;
            this.initPollingInterval();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache.prototype, "cacheItemRemovedEventEmitter", {
        get: function () {
            return this._cacheItemRemovedEventEmitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cache.prototype, "count", {
        get: function () {
            return this._map.size;
        },
        enumerable: true,
        configurable: true
    });
    Cache.prototype.contains = function (key) {
        return this._map.has(key);
    };
    Cache.prototype.set = function (key, value, policy) {
        var oldItem = this._map.get(key);
        var item = new cache_item_1.CacheItem(key, value, policy);
        this._map.set(key, item);
        if (oldItem && oldItem.policy.updatedCallback) {
            oldItem.policy.updatedCallback(key, item.value, oldItem.value);
        }
    };
    Cache.prototype.add = function (key, value, policy) {
        if (this._map.has(key)) {
            return false;
        }
        var item = new cache_item_1.CacheItem(key, value, policy);
        this._map.set(key, item);
        return true;
    };
    Cache.prototype.addOrGetExisting = function (key, value, policy) {
        var item = this._map.get(key);
        if (!item) {
            item = new cache_item_1.CacheItem(key, value, policy);
            this._map.set(key, item);
        }
        item.lastAccessed = Date.now();
        return item.value;
    };
    Cache.prototype.get = function (key) {
        var item = this._map.get(key);
        if (typeof (item) === 'undefined') {
            return null;
        }
        if (this.isExpired(item)) {
            this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.expired);
            return null;
        }
        item.lastAccessed = Date.now();
        return item.value;
    };
    Cache.prototype.remove = function (key) {
        var item = this._map.get(key);
        if (!item) {
            return null;
        }
        this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.removed);
        return item.value;
    };
    Cache.prototype.dispose = function () {
        clearInterval(this._pollingIntervalTimer);
    };
    Cache.prototype.removeItem = function (item, reason) {
        this._map.delete(item.key);
        if (item.policy.removedCallback) {
            item.policy.removedCallback(item.key, item.value, reason);
        }
        this._cacheItemRemovedEventEmitter.emit(item.key, item.value, reason);
    };
    Cache.prototype.isExpired = function (item, now) {
        if (now === void 0) { now = Date.now(); }
        if (item.policy.absoluteExpiration !== 0 && now > item.policy.absoluteExpiration) {
            return true;
        }
        if (item.policy.slidingExpiration !== 0 && now > item.lastAccessed + item.policy.slidingExpiration) {
            return true;
        }
        return false;
    };
    Cache.prototype.initPollingInterval = function () {
        var _this = this;
        clearInterval(this._pollingIntervalTimer);
        this._pollingIntervalTimer = setInterval(function () { return _this.onPolling(); }, this._pollingInterval);
        if (this._pollingIntervalTimer.unref) {
            this._pollingIntervalTimer.unref();
        }
    };
    Cache.prototype.onPolling = function () {
        var _this = this;
        var now = Date.now();
        this._map.forEach(function (item, key) {
            if (_this.isExpired(item, now)) {
                _this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.expired);
            }
        });
    };
    return Cache;
}());
exports.Cache = Cache;
