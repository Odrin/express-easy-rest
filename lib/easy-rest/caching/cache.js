"use strict";
const cache_item_1 = require("./cache-item");
const cache_item_removed_reason_1 = require("./cache-item-removed-reason");
const cache_item_removed_event_emitter_1 = require("./cache-item-removed-event-emitter");
let instance = null;
class Cache {
    constructor() {
        this._map = new Map();
        this._pollingInterval = Cache.defaultPollingInterval;
        this._cacheItemRemovedEventEmitter = new cache_item_removed_event_emitter_1.CacheItemRemovedEventEmitter();
        this.initPollingInterval();
    }
    static get instance() {
        if (instance === null) {
            instance = new Cache();
        }
        return instance;
    }
    static get defaultPollingInterval() {
        return 60 * 1000;
    }
    get pollingInterval() {
        return this._pollingInterval;
    }
    set pollingInterval(value) {
        this._pollingInterval = value;
        this.initPollingInterval();
    }
    get cacheItemRemovedEventEmitter() {
        return this._cacheItemRemovedEventEmitter;
    }
    get count() {
        return this._map.size;
    }
    contains(key) {
        return this._map.has(key);
    }
    set(key, value, policy) {
        let oldItem = this._map.get(key);
        let item = new cache_item_1.CacheItem(key, value, policy);
        this._map.set(key, item);
        if (oldItem && oldItem.policy.updatedCallback) {
            oldItem.policy.updatedCallback(key, item.value, oldItem.value);
        }
    }
    add(key, value, policy) {
        if (this._map.has(key)) {
            return false;
        }
        let item = new cache_item_1.CacheItem(key, value, policy);
        this._map.set(key, item);
        return true;
    }
    addOrGetExisting(key, value, policy) {
        let item = this._map.get(key);
        if (!item) {
            item = new cache_item_1.CacheItem(key, value, policy);
            this._map.set(key, item);
        }
        item.lastAccessed = Date.now();
        return item.value;
    }
    get(key) {
        let item = this._map.get(key);
        if (typeof (item) === 'undefined') {
            return null;
        }
        if (this.isExpired(item)) {
            this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.expired);
            return null;
        }
        item.lastAccessed = Date.now();
        return item.value;
    }
    remove(key) {
        let item = this._map.get(key);
        if (!item) {
            return null;
        }
        this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.removed);
        return item.value;
    }
    dispose() {
        clearInterval(this._pollingIntervalTimer);
    }
    removeItem(item, reason) {
        this._map.delete(item.key);
        if (item.policy.removedCallback) {
            item.policy.removedCallback(item.key, item.value, reason);
        }
        this._cacheItemRemovedEventEmitter.emit(item.key, item.value, reason);
    }
    isExpired(item, now = Date.now()) {
        if (item.policy.absoluteExpiration !== 0 && now > item.policy.absoluteExpiration) {
            return true;
        }
        if (item.policy.slidingExpiration !== 0 && now > item.lastAccessed + item.policy.slidingExpiration) {
            return true;
        }
        return false;
    }
    initPollingInterval() {
        clearInterval(this._pollingIntervalTimer);
        this._pollingIntervalTimer = setInterval(() => this.onPolling(), this._pollingInterval);
        if (this._pollingIntervalTimer.unref) {
            this._pollingIntervalTimer.unref();
        }
    }
    onPolling() {
        let now = Date.now();
        this._map.forEach((item, key) => {
            if (this.isExpired(item, now)) {
                this.removeItem(item, cache_item_removed_reason_1.CacheItemRemovedReason.expired);
            }
        });
    }
}
exports.Cache = Cache;
