"use strict";
const cache_item_removed_event_emitter_1 = require("../../easy-rest/caching/cache-item-removed-event-emitter");
const cache_item_removed_reason_1 = require("../../easy-rest/caching/cache-item-removed-reason");
describe('CacheItemRemovedEventEmitter spec', function () {
    let emitter;
    let key = 'test';
    let value = {};
    let reason = cache_item_removed_reason_1.CacheItemRemovedReason.removed;
    beforeEach(() => emitter = new cache_item_removed_event_emitter_1.CacheItemRemovedEventEmitter());
    it('should correctly add listener', (done) => {
        emitter.addListener(() => done());
        emitter.emit(key, value, reason);
    });
    it('should correctly remove listener', (done) => {
        let listener = () => done.fail();
        emitter.addListener(listener);
        emitter.removeListener(listener);
        emitter.emit(key, value, reason);
        setTimeout(done);
    });
    it('should emit given values', (done) => {
        emitter.addListener((k, v, r) => {
            expect(k).toEqual(key);
            expect(v).toEqual(v);
            expect(r).toEqual(r);
            done();
        });
        emitter.emit(key, value, reason);
    });
});
