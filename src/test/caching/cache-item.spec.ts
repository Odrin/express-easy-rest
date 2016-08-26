import {CacheItem} from "../../easy-rest/caching/cache-item";
import {CacheItemPriority} from "../../easy-rest/caching/cache-item-priority";

describe('CacheItem spec', function () {
  let cacheItem: CacheItem<any>;
  let key = 'test';
  let value: any = {};

  beforeEach(() => cacheItem = new CacheItem<any>(key, value));

  it('has given key', () => expect(cacheItem.key).toEqual(key));

  it('has given value', () => expect(cacheItem.value).toEqual(value));

  it('default priority is "normal"', () => expect(cacheItem.policy.priority).toEqual(CacheItemPriority.normal));

  it('default sliding expiration is 0', () => expect(cacheItem.policy.slidingExpiration).toEqual(0));

  it('default absolute expiration is 0', () => expect(cacheItem.policy.absoluteExpiration).toEqual(0));
});
