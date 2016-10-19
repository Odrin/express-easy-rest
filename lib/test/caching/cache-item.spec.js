"use strict";
const cache_item_1 = require("../../easy-rest/caching/cache-item");
const cache_item_priority_1 = require("../../easy-rest/caching/cache-item-priority");
describe('CacheItem spec', function () {
    let cacheItem;
    let key = 'test';
    let value = {};
    beforeEach(() => cacheItem = new cache_item_1.CacheItem(key, value));
    it('has given key', () => expect(cacheItem.key).toEqual(key));
    it('has given value', () => expect(cacheItem.value).toEqual(value));
    it('default priority is "normal"', () => expect(cacheItem.policy.priority).toEqual(cache_item_priority_1.CacheItemPriority.normal));
    it('default sliding expiration is 0', () => expect(cacheItem.policy.slidingExpiration).toEqual(0));
    it('default absolute expiration is 0', () => expect(cacheItem.policy.absoluteExpiration).toEqual(0));
});
