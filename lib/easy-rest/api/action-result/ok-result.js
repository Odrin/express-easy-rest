"use strict";
var response_message_1 = require("./response-message");
var OkResult = (function () {
    function OkResult(data) {
        this.data = data;
    }
    OkResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data);
        return Promise.resolve(message);
    };
    return OkResult;
}());
exports.OkResult = OkResult;
