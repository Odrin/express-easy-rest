"use strict";
var es6_promise_1 = require("es6-promise");
var data_binder_1 = require("./data-binder");
var response_message_1 = require("./action-result/response-message");
var ControllerDispatcher = (function () {
    function ControllerDispatcher(controllerConctructor, action, bindings, returnType) {
        var _this = this;
        this.controllerConctructor = controllerConctructor;
        this.action = action;
        this.bindings = bindings;
        this.returnType = returnType;
        this.handleRequest = function (req, res, next) {
            try {
                var instance = _this.instantiateController(req, res, next);
                var action = instance[_this.action];
                var parameters = new data_binder_1.DataBinder(req, _this.bindings).getParameters();
                var result = action.apply(instance, parameters);
                _this.handleResult(result)
                    .then(function (message) {
                    res.status(message.statusCode);
                    if (message.data) {
                        res.json(message.data);
                    }
                    else {
                        res.send();
                    }
                    next();
                })
                    .catch(function (error) {
                    res.status(500);
                    next(error);
                });
            }
            catch (error) {
                res.status(500);
                next(error);
            }
        };
        if (controllerConctructor.prototype[action].length !== bindings.length) {
            throw new Error("Binding configuration error: " + action);
        }
    }
    ControllerDispatcher.prototype.handleResult = function (result) {
        if (result instanceof es6_promise_1.Promise) {
            return this.handlePromiseResult(result);
        }
        if (this.isActionResult(result)) {
            return this.handleActionResult(result);
        }
        if (result instanceof response_message_1.ResponseMessage) {
            return this.handleResponseMessageResult(result);
        }
        return es6_promise_1.Promise.resolve(new response_message_1.ResponseMessage(result));
    };
    ControllerDispatcher.prototype.isActionResult = function (object) {
        return 'executeAsync' in object;
    };
    ControllerDispatcher.prototype.handlePromiseResult = function (result) {
        var _this = this;
        if (!result) {
            throw new Error("Action return type error. Expected: Promise, got: " + result);
        }
        return result.then(function (data) { return _this.handleResult(data); });
    };
    ControllerDispatcher.prototype.handleActionResult = function (result) {
        if (!result) {
            throw new Error("Action return type error. Expected: IActionResult, got: " + result);
        }
        return result.executeAsync();
    };
    ControllerDispatcher.prototype.handleResponseMessageResult = function (result) {
        if (!result) {
            throw new Error("Action return type error. Expected: ResponseMessage, got: " + result);
        }
        return es6_promise_1.Promise.resolve(result);
    };
    ControllerDispatcher.prototype.instantiateController = function (req, res, next) {
        var instance = new this.controllerConctructor();
        instance.requset = req;
        return instance;
    };
    return ControllerDispatcher;
}());
exports.ControllerDispatcher = ControllerDispatcher;
