import {CacheItemRemovedEventEmitter} from "../../easy-rest/caching/cache-item-removed-event-emitter";
import {CacheItemRemovedReason} from "../../easy-rest/caching/cache-item-removed-reason";

describe('CacheItemRemovedEventEmitter spec', function () {
  let emitter: CacheItemRemovedEventEmitter;
  let key = 'test';
  let value: any = {};
  let reason = CacheItemRemovedReason.removed;

  beforeEach(() => emitter = new CacheItemRemovedEventEmitter());

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
