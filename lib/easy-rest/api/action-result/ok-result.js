"use strict";
var es6_promise_1 = require("es6-promise");
var response_message_1 = require("./response-message");
var OkResult = (function () {
    function OkResult(data) {
        this.data = data;
    }
    OkResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data);
        return es6_promise_1.Promise.resolve(message);
    };
    return OkResult;
}());
exports.OkResult = OkResult;
