import { ICacheItemPolicy } from "./cache-item-policy";
import { CacheItemRemovedEventEmitter } from "./cache-item-removed-event-emitter";
export declare class Cache {
    static readonly instance: Cache;
    static readonly defaultPollingInterval: number;
    private _map;
    private _pollingInterval;
    private _pollingIntervalTimer;
    private _cacheItemRemovedEventEmitter;
    constructor();
    pollingInterval: number;
    readonly cacheItemRemovedEventEmitter: CacheItemRemovedEventEmitter;
    readonly count: number;
    contains(key: string): boolean;
    set<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): void;
    add<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): boolean;
    addOrGetExisting<T>(key: string, value: T, policy?: ICacheItemPolicy<T>): T | any;
    get<T>(key: string): T | null;
    remove(key: string): any;
    dispose(): void;
    private removeItem(item, reason);
    private isExpired(item, now?);
    private initPollingInterval();
    private onPolling();
}
