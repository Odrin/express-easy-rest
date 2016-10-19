import {CacheItem} from "./cache-item";
import {CacheItemRemovedReason} from "./cache-item-removed-reason";
import {ICacheItemPolicy} from "./cache-item-policy";
import {CacheItemRemovedEventEmitter} from "./cache-item-removed-event-emitter";

let instance: Cache | null = null;

//TODO: memory usage https://nodejs.org/api/process.html#process_process_memoryusage
export class Cache {
  static get instance(): Cache {
    if (instance === null) {
      instance = new Cache();
    }

    return instance;
  }

  static get defaultPollingInterval() {
    return 60 * 1000;
  }

  private _map = new Map<string, CacheItem<any>>();
  private _pollingInterval = Cache.defaultPollingInterval;
  private _pollingIntervalTimer: NodeJS.Timer;
  private _cacheItemRemovedEventEmitter = new CacheItemRemovedEventEmitter();

  constructor() {
    this.initPollingInterval();
  }

  get pollingInterval() {
    return this._pollingInterval;
  }

  set pollingInterval(value: number) {
    this._pollingInterval = value;
    this.initPollingInterval();
  }

  get cacheItemRemovedEventEmitter(): CacheItemRemovedEventEmitter {
    return this._cacheItemRemovedEventEmitter;
  }

  /**
   * Gets the number of items stored in the cache.
   */
  get count(): number {
    return this._map.size;
  }

  /**
   * Determines whether a cache entry exists in the cache.
   * @param key - The identifier for the cache item to retrieve
   */
  contains(key: string): boolean {
    return this._map.has(key);
  }

  /**
   * Inserts a cache entry into the cache, specifying information about how the entry will be evicted.
   * @param key - A unique identifier for the cache entry to insert.
   * @param value - The data for the cache entry.
   * @param policy - An object that contains eviction details for the cache entry.
   */
  set<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): void {
    let oldItem = this._map.get(key);
    let item = new CacheItem<T>(key, value, policy);

    this._map.set(key, item);

    if (oldItem && oldItem.policy.updatedCallback) {
      oldItem.policy.updatedCallback(key, item.value, oldItem.value);
    }
  }

  /**
   * Inserts a cache entry into the cache, specifying information about how the entry will be evicted.
   * @param key - A unique identifier for the cache entry to insert.
   * @param value - The data for the cache entry.
   * @param policy - An object that contains eviction details for the cache entry.
   * @return {boolean} true if the insertion try succeeds, or false if there is an already an entry in the cache with the same key as key.
   */
  add<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): boolean {
    if (this._map.has(key)) {
      return false;
    }

    let item = new CacheItem<T>(key, value, policy);

    this._map.set(key, item);

    return true;
  }

  /**
   * Inserts a cache entry into the cache, specifying information about how the entry will be evicted.
   * @param key - A unique identifier for the cache entry to insert.
   * @param value - The data for the cache entry.
   * @param policy - An object that contains eviction details for the cache entry.
   * @return {T|*} cache entry
   */
  addOrGetExisting<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): T | any {
    let item = this._map.get(key);

    if (!item) {
      item = new CacheItem<T>(key, value, policy);
      this._map.set(key, item);
    }

    item.lastAccessed = Date.now();

    return item.value;
  }

  /**
   * The retrieved cache item, or null if the key is not found
   * @param key - The identifier for the cache item to retrieve
   * @return {T} A reference to the cache entry that is identified by key, if the entry exists; otherwise, null.
   */
  get<T>(key: string): T | null {
    let item: CacheItem<T> = this._map.get(key);

    if (typeof (item) === 'undefined') {
      return null;
    }

    if (this.isExpired(item)) {
      this.removeItem(item, CacheItemRemovedReason.expired);
      return null;
    }

    item.lastAccessed = Date.now();

    return item.value;
  }

  /**
   * Removes a cache entry from the cache.
   * @param key - A unique identifier for the cache entry to remove.
   * @return {*} If the entry is found in the cache, the removed cache entry; otherwise, null.
   */
  remove(key: string): any {
    let item = this._map.get(key);

    if (!item) {
      return null;
    }

    this.removeItem(item, CacheItemRemovedReason.removed);

    return item.value;
  }

  dispose() {
    clearInterval(this._pollingIntervalTimer);
  }

  private removeItem(item: CacheItem<any>, reason: CacheItemRemovedReason): void {
    this._map.delete(item.key);

    if (item.policy.removedCallback) {
      item.policy.removedCallback(item.key, item.value, reason);
    }

    this._cacheItemRemovedEventEmitter.emit(item.key, item.value, reason);
  }

  private isExpired(item: CacheItem<any>, now: number = Date.now()): boolean {
    if (item.policy.absoluteExpiration !== 0 && now > item.policy.absoluteExpiration) {
      return true;
    }

    if (item.policy.slidingExpiration !== 0 && now > item.lastAccessed + item.policy.slidingExpiration) {
      return true;
    }

    return false;
  }

  private initPollingInterval() {
    clearInterval(this._pollingIntervalTimer);
    this._pollingIntervalTimer = setInterval(() => this.onPolling(), this._pollingInterval);

    if (this._pollingIntervalTimer.unref) {
      // for jasmine testing
      this._pollingIntervalTimer.unref();
    }
  }

  private onPolling() {
    let now = Date.now();

    this._map.forEach((item: CacheItem<any>, key: string) => {
      if (this.isExpired(item, now)) {
        this.removeItem(item, CacheItemRemovedReason.expired);
      }
    });
  }

}
