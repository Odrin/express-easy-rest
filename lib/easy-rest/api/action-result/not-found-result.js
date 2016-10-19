"use strict";
const response_message_1 = require("./response-message");
class NotFoundResult {
    constructor(data) {
        this.data = data;
    }
    executeAsync() {
        let message = new response_message_1.ResponseMessage(this.data, 404);
        return Promise.resolve(message);
    }
}
exports.NotFoundResult = NotFoundResult;
