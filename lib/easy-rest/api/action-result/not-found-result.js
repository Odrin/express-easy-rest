"use strict";
var response_message_1 = require("./response-message");
var NotFoundResult = (function () {
    function NotFoundResult(data) {
        this.data = data;
    }
    NotFoundResult.prototype.executeAsync = function () {
        var message = new response_message_1.ResponseMessage(this.data, 404);
        return Promise.resolve(message);
    };
    return NotFoundResult;
}());
exports.NotFoundResult = NotFoundResult;
