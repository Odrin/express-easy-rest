"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var application_error_1 = require("./application-error");
var ModelValidationError = (function (_super) {
    __extends(ModelValidationError, _super);
    function ModelValidationError(key, value) {
        _super.call(this, "Model validation error: " + key + ":" + JSON.stringify(value));
        this.key = key;
    }
    return ModelValidationError;
}(application_error_1.ApplicationError));
exports.ModelValidationError = ModelValidationError;