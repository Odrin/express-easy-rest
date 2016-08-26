"use strict";
var cache_1 = require("../../easy-rest/caching/cache");
var cache_item_removed_reason_1 = require("../../easy-rest/caching/cache-item-removed-reason");
describe('Cache spec', function () {
    var cache;
    var key = 'test';
    var value = 'value';
    beforeEach(function () { return cache = new cache_1.Cache(); });
    afterEach(function () { return cache.dispose(); });
    it('default polling interval is set', function () { return expect(cache.pollingInterval).toEqual(cache_1.Cache.defaultPollingInterval); });
    describe('set<T> method spec', function () {
        it('should contains new item after set call', function () {
            cache.set(key, value);
            expect(cache.contains(key)).toBeTruthy();
            expect(cache.get(key)).toEqual(value);
        });
        it('should call "updatedCallback" whith correct values when item updated', function () {
            var value2 = 'value2';
            var policy = {
                updatedCallback: function (k, newValue, oldValue) {
                    expect(k).toEqual(key);
                    expect(oldValue).toEqual(value);
                    expect(newValue).toEqual(value2);
                }
            };
            cache.set(key, value, policy);
            cache.set(key, value2);
        });
    });
    describe('add<T> method spec', function () {
        it('should contains new item after add call', function () {
            cache.add(key, value);
            expect(cache.contains(key)).toBeTruthy();
            expect(cache.get(key)).toEqual(value);
        });
        it('should return true if item successfully added', function () {
            expect(cache.add(key, value)).toBeTruthy();
        });
        it('should return false if item already added', function () {
            cache.add(key, value);
            expect(cache.add(key, value)).toBeFalsy();
        });
        it('shouldn\'t update value if item already added', function () {
            var newValue = 'newValue';
            cache.add(key, value);
            expect(cache.get(key)).not.toBe(newValue);
        });
    });
    describe('addOrGetExisting<T> method spec', function () {
        it('should contains new item after add call', function () {
            cache.addOrGetExisting(key, value);
            expect(cache.contains(key)).toBeTruthy();
            expect(cache.get(key)).toEqual(value);
        });
        it('should return item if already added', function () {
            var newValue = 'newValue';
            expect(cache.addOrGetExisting(key, value)).toBe(value);
            expect(cache.addOrGetExisting(key, newValue)).toBe(value);
        });
    });
    describe('remove method spec', function () {
        it('should remove item and return it if exists', function () {
            cache.add(key, value);
            expect(cache.remove(key)).toEqual(value);
            expect(cache.contains(key)).toBeFalsy();
        });
        it('should return null if key not found', function () {
            var anyKey = 'anyKey';
            expect(cache.remove(anyKey)).toBeNull();
        });
        it('should call "removedCallback" whith correct values when item removed', function () {
            var value2 = 'value2';
            var policy = {
                removedCallback: function (k, v, reason) {
                    expect(k).toEqual(key);
                    expect(v).toEqual(value);
                    expect(reason).toEqual(cache_item_removed_reason_1.CacheItemRemovedReason.removed);
                }
            };
            cache.set(key, value, policy);
            cache.remove(key);
        });
    });
    describe('cache interval', function () {
        beforeEach(function () {
            jasmine.clock().install();
            jasmine.clock().mockDate();
        });
        afterEach(function () {
            jasmine.clock().uninstall();
        });
        it('should remove item from cache on absolute expiration', function () {
            var policy = {
                absoluteExpiration: Date.now() + 1000
            };
            cache.set(key, value, policy);
            cache.pollingInterval = 100;
            jasmine.clock().tick(999);
            expect(cache.contains(key)).toBeTruthy();
            jasmine.clock().tick(101);
            expect(cache.contains(key)).toBeFalsy();
        });
        it('should remove item from cache on sliding expiration', function () {
            var policy = {
                slidingExpiration: 1000
            };
            cache.set(key, value, policy);
            cache.pollingInterval = 100;
            jasmine.clock().tick(999);
            expect(cache.contains(key)).toBeTruthy();
            jasmine.clock().tick(101);
            expect(cache.contains(key)).toBeFalsy();
        });
        it('shouldn\'t remove item from cache on sliding expiration after item accessed', function () {
            var policy = {
                slidingExpiration: 1000
            };
            cache.set(key, value, policy);
            cache.pollingInterval = 100;
            jasmine.clock().tick(999);
            expect(cache.contains(key)).toBeTruthy();
            cache.get(key);
            jasmine.clock().tick(101);
            expect(cache.contains(key)).toBeTruthy();
        });
    });
});
