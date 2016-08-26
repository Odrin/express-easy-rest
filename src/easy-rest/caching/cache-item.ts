import {ICacheItemPolicy} from "./cache-item-policy";
import {CacheItemPriority} from "./cache-item-priority";

/**
 * Represents an individual cache entry in the cache.
 */
export class CacheItem<T> {
  /**
   * Gets or sets the data for a CacheItem instance.
   */
  value: T;
  /**
   * Gets or sets a unique identifier for a CacheItem instance.
   */
  key: string;
  created: number;
  lastAccessed: number;
  policy: ICacheItemPolicy<T>;

  constructor(key: string, value: T, policy?: ICacheItemPolicy<T>) {
    if (!key) {
      throw new Error('key not specified');
    }

    if (!policy) {
      policy = {};
    }

    this.key = key;
    this.value = value;
    this.policy = {
      priority: policy.priority || CacheItemPriority.normal,
      absoluteExpiration: policy.absoluteExpiration || 0,
      slidingExpiration: policy.slidingExpiration || 0,
      updatedCallback: policy.updatedCallback,
      removedCallback: policy.removedCallback
    };
    this.created = this.lastAccessed = Date.now();
  }
}
