"use strict";
class ResponseMessage {
    constructor(data, statusCode = 200) {
        this.data = data;
        this.statusCode = statusCode;
    }
}
exports.ResponseMessage = ResponseMessage;
