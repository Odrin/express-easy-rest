"use strict";
const http_error_1 = require("./http-error");
class NotFoundError extends http_error_1.HttpError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
