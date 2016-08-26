import {ICacheItemRemovedCallback} from "./cache-item-removed-callback";
import {CacheItemPriority} from "./cache-item-priority";
import {ICacheItemUpdatedCallback} from "./cacheitem-updated-callback";

/**
 * Represents a set of eviction and expiration details for a specific cache entry.
 */
export interface ICacheItemPolicy<T> {
  /**
   * Gets or sets a priority setting that is used to determine whether to evict a cache entry.
   */
  priority?: CacheItemPriority;

  /**
   * The time at which the inserted object expires and is removed from the cache.
   * A number representing the milliseconds elapsed since the UNIX epoch.
   */
  absoluteExpiration?: number;

  /**
   * The interval between the time that the cached object was last accessed and the time at which that object expires.
   * A number representing the milliseconds elapsed since last accessed.
   */
  slidingExpiration?: number;

  /**
   * A function that, if provided, is called when an object is removed from the cache.
   * You can use this to notify applications when their objects are deleted from the cache.
   */
  removedCallback?: ICacheItemRemovedCallback<T>;

  /**
   * A function that, if provided, is called when an object is removed from the cache and replaced by another object.
   */
  updatedCallback?: ICacheItemUpdatedCallback;
}
