import {EventEmitter} from "events";
import {ICacheItemRemovedCallback} from "./cache-item-removed-callback";
import {CacheItemRemovedReason} from "./cache-item-removed-reason";

export class CacheItemRemovedEventEmitter {
  private event = 'CacheItemRemoved';
  private eventEmitter = new EventEmitter();

  addListener(listener: ICacheItemRemovedCallback<any>) {

    this.eventEmitter.addListener(this.event, <Function>listener);
  }

  removeListener(listener: ICacheItemRemovedCallback<any>) {
    this.eventEmitter.removeListener(this.event, <Function>listener);
  }

  emit(key: string, value: any, reason: CacheItemRemovedReason) {
    this.eventEmitter.emit(this.event, key, value, reason);
  }
}
