"use strict";
const http_error_1 = require("./http-error");
class UnauthorizedError extends http_error_1.HttpError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
