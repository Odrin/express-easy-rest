import {Cache} from "../../easy-rest/caching/cache";
import {ICacheItemPolicy} from "../../easy-rest/caching/cache-item-policy";
import {CacheItemRemovedReason} from "../../easy-rest/caching/cache-item-removed-reason";

describe('Cache spec', () => {
  let cache: Cache;
  let key = 'test';
  let value = 'value';

  beforeEach(() => cache = new Cache());
  afterEach(() => cache.dispose());

  it('default polling interval is set', () => expect(cache.pollingInterval).toEqual(Cache.defaultPollingInterval));

  describe('set<T> method spec', () => {
    it('should contains new item after set call', () => {
      cache.set(key, value);

      expect(cache.contains(key)).toBeTruthy();
      expect(cache.get(key)).toEqual(value);
    });

    it('should call "updatedCallback" whith correct values when item updated', () => {
      let value2 = 'value2';
      let policy: ICacheItemPolicy<any> = {
        updatedCallback(k: string, newValue: any, oldValue: any) {
          expect(k).toEqual(key);
          expect(oldValue).toEqual(value);
          expect(newValue).toEqual(value2);
        }
      };

      cache.set(key, value, policy);
      cache.set(key, value2);
    });
  });

  describe('add<T> method spec', () => {
    it('should contains new item after add call', () => {
      cache.add(key, value);

      expect(cache.contains(key)).toBeTruthy();
      expect(cache.get(key)).toEqual(value);
    });

    it('should return true if item successfully added', () => {
      expect(cache.add(key, value)).toBeTruthy();
    });

    it('should return false if item already added', () => {
      cache.add(key, value);
      expect(cache.add(key, value)).toBeFalsy();
    });

    it('shouldn\'t update value if item already added', () => {
      let newValue = 'newValue';

      cache.add(key, value);

      expect(cache.get(key)).not.toBe(newValue);
    });
  });

  describe('addOrGetExisting<T> method spec', () => {
    it('should contains new item after add call', () => {
      cache.addOrGetExisting(key, value);

      expect(cache.contains(key)).toBeTruthy();
      expect(cache.get(key)).toEqual(value);
    });

    it('should return item if already added', () => {
      let newValue = 'newValue';

      expect(cache.addOrGetExisting(key, value)).toBe(value);
      expect(cache.addOrGetExisting(key, newValue)).toBe(value);
    });
  });

  describe('remove method spec', () => {
    it('should remove item and return it if exists', () => {
      cache.add(key, value);

      expect(cache.remove(key)).toEqual(value);
      expect(cache.contains(key)).toBeFalsy();
    });

    it('should return null if key not found', () => {
      let anyKey = 'anyKey';

      expect(cache.remove(anyKey)).toBeNull();
    });

    it('should call "removedCallback" whith correct values when item removed', () => {
      let value2 = 'value2';
      let policy: ICacheItemPolicy<any> = {
        removedCallback(k: string, v: any, reason: CacheItemRemovedReason) {
          expect(k).toEqual(key);
          expect(v).toEqual(value);
          expect(reason).toEqual(CacheItemRemovedReason.removed);
        }
      };

      cache.set(key, value, policy);
      cache.remove(key);
    });
  });

  describe('cache interval', () => {
    beforeEach(function() {
      jasmine.clock().install();
      jasmine.clock().mockDate();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('should remove item from cache on absolute expiration', () => {
      let policy: ICacheItemPolicy<any> = {
        absoluteExpiration: Date.now() + 1000 // + 1s.
      };

      cache.set(key, value, policy);
      cache.pollingInterval = 100;

      jasmine.clock().tick(999);
      expect(cache.contains(key)).toBeTruthy();

      jasmine.clock().tick(101);
      expect(cache.contains(key)).toBeFalsy();
    });

    it('should remove item from cache on sliding expiration', () => {
      let policy: ICacheItemPolicy<any> = {
        slidingExpiration: 1000 // 1s.
      };

      cache.set(key, value, policy);
      cache.pollingInterval = 100;

      jasmine.clock().tick(999);
      expect(cache.contains(key)).toBeTruthy();

      jasmine.clock().tick(101);
      expect(cache.contains(key)).toBeFalsy();
    });

    it('shouldn\'t remove item from cache on sliding expiration after item accessed', () => {
      let policy: ICacheItemPolicy<any> = {
        slidingExpiration: 1000 // 1s.
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
