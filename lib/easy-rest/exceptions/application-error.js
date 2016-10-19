"use strict";
class ApplicationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ApplicationError = ApplicationError;
