"use strict";
const response_message_1 = require("./response-message");
class ErrorResult {
    constructor(data) {
        this.data = data;
    }
    executeAsync() {
        let message = new response_message_1.ResponseMessage(this.data, 500);
        return Promise.resolve(message);
    }
}
exports.ErrorResult = ErrorResult;
