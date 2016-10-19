"use strict";
const http_error_1 = require("./http-error");
class BadRequestError extends http_error_1.HttpError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
