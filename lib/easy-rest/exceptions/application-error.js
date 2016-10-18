"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApplicationError = (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return ApplicationError;
}(Error));
exports.ApplicationError = ApplicationError;
