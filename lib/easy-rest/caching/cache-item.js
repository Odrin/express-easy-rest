"use strict";
const cache_item_priority_1 = require("./cache-item-priority");
class CacheItem {
    constructor(key, value, policy) {
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
}
exports.CacheItem = CacheItem;
