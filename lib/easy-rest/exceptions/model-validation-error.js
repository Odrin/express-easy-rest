"use strict";
const application_error_1 = require("./application-error");
class ModelValidationError extends application_error_1.ApplicationError {
    constructor(errors) {
        super(`Model validation error: ${JSON.stringify(errors)}`);
        this.errors = errors;
    }
}
exports.ModelValidationError = ModelValidationError;
