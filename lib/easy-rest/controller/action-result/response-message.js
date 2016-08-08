"use strict";
var ResponseMessage = (function () {
    function ResponseMessage(data, statusCode) {
        if (statusCode === void 0) { statusCode = 200; }
        this.data = data;
        this.statusCode = statusCode;
    }
    return ResponseMessage;
}());
exports.ResponseMessage = ResponseMessage;
