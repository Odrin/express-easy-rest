import { CacheItemRemovedReason } from "./cache-item-removed-reason";
export interface ICacheItemRemovedCallback<T> {
    (key: string, value: T, reason: CacheItemRemovedReason): void;
}
