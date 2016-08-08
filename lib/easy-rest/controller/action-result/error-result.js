"use strict";
var es6_promise_1 = require("es6-promise");
var response_message_1 = require("./response-message");
var ErrorResult = (function () {
    function ErrorResult(data) {
        this.data = data;
    }
    ErrorResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 500);
        return es6_promise_1.Promise.resolve(message);
    };
    return ErrorResult;
}());
exports.ErrorResult = ErrorResult;
