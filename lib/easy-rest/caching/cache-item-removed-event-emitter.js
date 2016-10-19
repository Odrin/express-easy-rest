"use strict";
const events_1 = require("events");
class CacheItemRemovedEventEmitter {
    constructor() {
        this.event = 'CacheItemRemoved';
        this.eventEmitter = new events_1.EventEmitter();
    }
    addListener(listener) {
        this.eventEmitter.addListener(this.event, listener);
    }
    removeListener(listener) {
        this.eventEmitter.removeListener(this.event, listener);
    }
    emit(key, value, reason) {
        this.eventEmitter.emit(this.event, key, value, reason);
    }
}
exports.CacheItemRemovedEventEmitter = CacheItemRemovedEventEmitter;
