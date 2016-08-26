import { ICacheItemRemovedCallback } from "./cache-item-removed-callback";
import { CacheItemRemovedReason } from "./cache-item-removed-reason";
export declare class CacheItemRemovedEventEmitter {
    private event;
    private eventEmitter;
    addListener(listener: ICacheItemRemovedCallback<any>): void;
    removeListener(listener: ICacheItemRemovedCallback<any>): void;
    emit(key: string, value: any, reason: CacheItemRemovedReason): void;
}
