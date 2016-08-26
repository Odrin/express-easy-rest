import { ICacheItemPolicy } from "./cache-item-policy";
export declare class CacheItem<T> {
    value: T;
    key: string;
    created: number;
    lastAccessed: number;
    policy: ICacheItemPolicy<T>;
    constructor(key: string, value: T, policy?: ICacheItemPolicy<T>);
}
