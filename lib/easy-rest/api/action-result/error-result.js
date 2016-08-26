"use strict";
var response_message_1 = require("./response-message");
var ErrorResult = (function () {
    function ErrorResult(data) {
        this.data = data;
    }
    ErrorResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 500);
        return Promise.resolve(message);
    };
    return ErrorResult;
}());
exports.ErrorResult = ErrorResult;
