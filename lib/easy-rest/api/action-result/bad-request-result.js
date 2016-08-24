"use strict";
var response_message_1 = require("./response-message");
var BadRequestResult = (function () {
    function BadRequestResult(data) {
        this.data = data;
    }
    BadRequestResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 400);
        return Promise.resolve(message);
    };
    return BadRequestResult;
}());
exports.BadRequestResult = BadRequestResult;
