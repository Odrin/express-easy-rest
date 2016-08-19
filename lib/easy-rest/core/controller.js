"use strict";
var ok_result_1 = require("../controller/action-result/ok-result");
var error_result_1 = require("../controller/action-result/error-result");
var bad_request_result_1 = require("../controller/action-result/bad-request-result");
var not_found_result_1 = require("../controller/action-result/not-found-result");
var Controller = (function () {
    function Controller() {
    }
    Object.defineProperty(Controller.prototype, "requset", {
        get: function () {
            return this._req;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "response", {
        get: function () {
            return this._res;
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.ok = function (data) {
        return new ok_result_1.OkResult(data);
    };
    Controller.prototype.error = function (data) {
        return new error_result_1.ErrorResult(data);
    };
    Controller.prototype.badRequest = function (data) {
        return new bad_request_result_1.BadRequestResult(data);
    };
    Controller.prototype.notFound = function (data) {
        return new not_found_result_1.NotFoundResult(data);
    };
    return Controller;
}());
exports.Controller = Controller;
