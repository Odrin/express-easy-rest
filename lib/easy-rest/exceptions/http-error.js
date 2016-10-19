"use strict";
const application_error_1 = require("./application-error");
class HttpError extends application_error_1.ApplicationError {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    getMessage() {
        return this.message;
    }
}
exports.HttpError = HttpError;
