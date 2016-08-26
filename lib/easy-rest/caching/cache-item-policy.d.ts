import { ICacheItemRemovedCallback } from "./cache-item-removed-callback";
import { CacheItemPriority } from "./cache-item-priority";
import { ICacheItemUpdatedCallback } from "./cacheitem-updated-callback";
export interface ICacheItemPolicy<T> {
    priority?: CacheItemPriority;
    absoluteExpiration?: number;
    slidingExpiration?: number;
    removedCallback?: ICacheItemRemovedCallback<T>;
    updatedCallback?: ICacheItemUpdatedCallback;
}
