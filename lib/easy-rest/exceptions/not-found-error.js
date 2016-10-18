"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_error_1 = require("./http-error");
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        _super.call(this, 404, message);
    }
    return NotFoundError;
}(http_error_1.HttpError));
exports.NotFoundError = NotFoundError;
