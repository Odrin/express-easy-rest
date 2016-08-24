"use strict";
var es6_promise_1 = require("es6-promise");
var response_message_1 = require("./response-message");
var NotFoundResult = (function () {
    function NotFoundResult(data) {
        this.data = data;
    }
    NotFoundResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 404);
        return es6_promise_1.Promise.resolve(message);
    };
    return NotFoundResult;
}());
exports.NotFoundResult = NotFoundResult;
