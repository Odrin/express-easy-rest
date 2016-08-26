"use strict";
var cache_item_1 = require("../../easy-rest/caching/cache-item");
var cache_item_priority_1 = require("../../easy-rest/caching/cache-item-priority");
describe('CacheItem spec', function () {
    var cacheItem;
    var key = 'test';
    var value = {};
    beforeEach(function () { return cacheItem = new cache_item_1.CacheItem(key, value); });
    it('has given key', function () { return expect(cacheItem.key).toEqual(key); });
    it('has given value', function () { return expect(cacheItem.value).toEqual(value); });
    it('default priority is "normal"', function () { return expect(cacheItem.policy.priority).toEqual(cache_item_priority_1.CacheItemPriority.normal); });
    it('default sliding expiration is 0', function () { return expect(cacheItem.policy.slidingExpiration).toEqual(0); });
    it('default absolute expiration is 0', function () { return expect(cacheItem.policy.absoluteExpiration).toEqual(0); });
});
