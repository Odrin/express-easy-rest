"use strict";
const ok_result_1 = require("./action-result/ok-result");
const error_result_1 = require("./action-result/error-result");
const bad_request_result_1 = require("./action-result/bad-request-result");
const not_found_result_1 = require("./action-result/not-found-result");
class ApiController {
    constructor() {
    }
    get context() {
        return this._context;
    }
    get user() {
        return this._context.httpContext.user;
    }
    get request() {
        return this._context.httpContext.request;
    }
    ok(data) {
        return new ok_result_1.OkResult(data);
    }
    error(data) {
        return new error_result_1.ErrorResult(data);
    }
    badRequest(data) {
        return new bad_request_result_1.BadRequestResult(data);
    }
    notFound(data) {
        return new not_found_result_1.NotFoundResult(data);
    }
}
exports.ApiController = ApiController;
