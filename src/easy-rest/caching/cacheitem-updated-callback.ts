/**
 * Defines a callback method for notifying applications when a cached item is updated.
 */
export interface ICacheItemUpdatedCallback {
  /**
   * @param key - The key that is removed from the cache.
   * @param newValue - New value in cache
   * @param oldValue - Old value in cache
   */
  (key: string, newValue: any, oldValue: any): void;
}
