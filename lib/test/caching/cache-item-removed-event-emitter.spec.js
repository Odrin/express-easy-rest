"use strict";
var cache_item_removed_event_emitter_1 = require("../../easy-rest/caching/cache-item-removed-event-emitter");
var cache_item_removed_reason_1 = require("../../easy-rest/caching/cache-item-removed-reason");
describe('CacheItemRemovedEventEmitter spec', function () {
    var emitter;
    var key = 'test';
    var value = {};
    var reason = cache_item_removed_reason_1.CacheItemRemovedReason.removed;
    beforeEach(function () { return emitter = new cache_item_removed_event_emitter_1.CacheItemRemovedEventEmitter(); });
    it('should correctly add listener', function (done) {
        emitter.addListener(function () { return done(); });
        emitter.emit(key, value, reason);
    });
    it('should correctly remove listener', function (done) {
        var listener = function () { return done.fail(); };
        emitter.addListener(listener);
        emitter.removeListener(listener);
        emitter.emit(key, value, reason);
        setTimeout(done);
    });
    it('should emit given values', function (done) {
        emitter.addListener(function (k, v, r) {
            expect(k).toEqual(key);
            expect(v).toEqual(v);
            expect(r).toEqual(r);
            done();
        });
        emitter.emit(key, value, reason);
    });
});
