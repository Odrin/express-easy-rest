"use strict";
var cache_item_priority_1 = require("./cache-item-priority");
var CacheItem = (function () {
    function CacheItem(key, value, policy) {
        if (!key) {
            throw new Error('key not specified');
        }
        if (!policy) {
            policy = {};
        }
        this.key = key;
        this.value = value;
        this.policy = {
            priority: policy.priority || cache_item_priority_1.CacheItemPriority.normal,
            absoluteExpiration: policy.absoluteExpiration || 0,
            slidingExpiration: policy.slidingExpiration || 0,
            updatedCallback: policy.updatedCallback,
            removedCallback: policy.removedCallback
        };
        this.created = this.lastAccessed = Date.now();
    }
    return CacheItem;
}());
exports.CacheItem = CacheItem;
