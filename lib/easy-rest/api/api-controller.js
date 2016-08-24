"use strict";
var ok_result_1 = require("./action-result/ok-result");
var error_result_1 = require("./action-result/error-result");
var bad_request_result_1 = require("./action-result/bad-request-result");
var not_found_result_1 = require("./action-result/not-found-result");
var ApiController = (function () {
    function ApiController() {
    }
    Object.defineProperty(ApiController.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiController.prototype, "user", {
        get: function () {
            return this._context.httpContext.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiController.prototype, "request", {
        get: function () {
            return this._context.httpContext.request;
        },
        enumerable: true,
        configurable: true
    });
    ApiController.prototype.ok = function (data) {
        return new ok_result_1.OkResult(data);
    };
    ApiController.prototype.error = function (data) {
        return new error_result_1.ErrorResult(data);
    };
    ApiController.prototype.badRequest = function (data) {
        return new bad_request_result_1.BadRequestResult(data);
    };
    ApiController.prototype.notFound = function (data) {
        return new not_found_result_1.NotFoundResult(data);
    };
    return ApiController;
}());
exports.ApiController = ApiController;
