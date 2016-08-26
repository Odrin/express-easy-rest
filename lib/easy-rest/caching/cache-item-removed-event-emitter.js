"use strict";
var events_1 = require("events");
var CacheItemRemovedEventEmitter = (function () {
    function CacheItemRemovedEventEmitter() {
        this.event = 'CacheItemRemoved';
        this.eventEmitter = new events_1.EventEmitter();
    }
    CacheItemRemovedEventEmitter.prototype.addListener = function (listener) {
        this.eventEmitter.addListener(this.event, listener);
    };
    CacheItemRemovedEventEmitter.prototype.removeListener = function (listener) {
        this.eventEmitter.removeListener(this.event, listener);
    };
    CacheItemRemovedEventEmitter.prototype.emit = function (key, value, reason) {
        this.eventEmitter.emit(this.event, key, value, reason);
    };
    return CacheItemRemovedEventEmitter;
}());
exports.CacheItemRemovedEventEmitter = CacheItemRemovedEventEmitter;
