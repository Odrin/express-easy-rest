/**
 * Specifies the reason an item was removed from the Cache.
 */
export enum CacheItemRemovedReason {
  /**
   * The item is removed from the cache because it expired.
   */
  expired,
  /**
   * The item is removed from the cache by a Remove method call or by an Insert method call that specified the same key.
   */
  removed,
  /**
   * The item is removed from the cache because the system removed it to free memory.
   */
  underused
}
