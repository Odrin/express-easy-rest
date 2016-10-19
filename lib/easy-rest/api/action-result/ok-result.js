"use strict";
const response_message_1 = require("./response-message");
class OkResult {
    constructor(data) {
        this.data = data;
    }
    executeAsync() {
        let message = new response_message_1.ResponseMessage(this.data);
        return Promise.resolve(message);
    }
}
exports.OkResult = OkResult;
