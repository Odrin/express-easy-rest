import {CacheItemRemovedReason} from "./cache-item-removed-reason";

/**
 * Defines a callback method for notifying applications when a cached item is removed from the Cache.
 */
export interface ICacheItemRemovedCallback<T> {
  /**
   * @param key - The key that is removed from the cache.
   * @param value - The item associated with the key removed from the cache.
   * @param reason - The reason the item was removed from the cache, as specified by the CacheItemRemovedReason enumeration.
   */
  (key: string, value: T, reason: CacheItemRemovedReason): void;
}
