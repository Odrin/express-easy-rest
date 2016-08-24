"use strict";
var es6_promise_1 = require("es6-promise");
var response_message_1 = require("./response-message");
var BadRequestResult = (function () {
    function BadRequestResult(data) {
        this.data = data;
    }
    BadRequestResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 400);
        return es6_promise_1.Promise.resolve(message);
    };
    return BadRequestResult;
}());
exports.BadRequestResult = BadRequestResult;
