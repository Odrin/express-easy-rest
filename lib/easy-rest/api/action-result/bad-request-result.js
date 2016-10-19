"use strict";
const response_message_1 = require("./response-message");
class BadRequestResult {
    constructor(data) {
        this.data = data;
    }
    executeAsync() {
        let message = new response_message_1.ResponseMessage(this.data, 400);
        return Promise.resolve(message);
    }
}
exports.BadRequestResult = BadRequestResult;
