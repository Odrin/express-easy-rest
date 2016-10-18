"use strict";
var data_binder_1 = require("./data-binder");
var response_message_1 = require("./action-result/response-message");
var http_context_provider_1 = require("../util/http-context-provider");
var metadata_1 = require("../metadata/metadata");
var metadata_keys_1 = require("../metadata/metadata-keys");
var http_action_context_1 = require("../http/http-action-context");
var http_controller_descriptor_1 = require("../http/http-controller-descriptor");
var http_action_descriptor_1 = require("../http/http-action-descriptor");
var http_error_1 = require("../exceptions/http-error");
var model_validator_1 = require("./model-validator");
var model_validation_error_1 = require("../exceptions/model-validation-error");
var ControllerDispatcher = (function () {
    function ControllerDispatcher(instance, controller, action) {
        var _this = this;
        this.instance = instance;
        this.controller = controller;
        this.action = action;
        this.handleRequest = function (req, res, next) {
            try {
                var actionContext_1 = _this.getActionContext(req);
                if (_this.authorizationFilter && !_this.authorizationFilter.onAuthorization(actionContext_1)) {
                    return next();
                }
                var instance = _this.instantiateController(actionContext_1);
                var action = instance[_this.action];
                var parameters = _this.dataBinder.getParameters(req);
                _this.applyAction(action, instance, parameters)
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
                    if (error instanceof http_error_1.HttpError) {
                        res.status(error.getStatus());
                        res.json(error.getMessage());
                        next(error);
                    }
                    else {
                        _this.exceptionHandler(actionContext_1, error);
                    }
                });
            }
            catch (error) {
                if (error instanceof model_validation_error_1.ModelValidationError) {
                    res.status(400);
                    next(error);
                }
                else {
                    res.status(500);
                    next(error);
                }
            }
        };
        this.returnType = metadata_1.Metadata.getReturnType(controller.prototype, action);
        this.bindings = metadata_1.Metadata.get(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
        this.dataBinder = new data_binder_1.DataBinder(this.bindings, new model_validator_1.ModelValidator());
        if (controller.prototype[action].length !== this.bindings.length) {
            throw new Error("Binding configuration error: " + action);
        }
        var controllerRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controller);
        var actionRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controller.prototype, action);
        if (controllerRoles || actionRoles) {
            var roles = []
                .concat(controllerRoles || [])
                .concat(actionRoles || [])
                .filter(function (value, index, array) { return array.indexOf(value) === index; });
            this.authorizationFilter = instance.getAuthorizationFilter();
            this.authorizationFilter.roles = roles;
        }
        var controllerExceptionHandler = metadata_1.Metadata.get(metadata_keys_1.CONTROLLER_EXCEPTION_FILTER_METADATA_KEY, controller);
        var actionExceptionHandler = metadata_1.Metadata.get(metadata_keys_1.ACTION_EXCEPTION_FILTER_METADATA_KEY, controller.prototype, action);
        this.exceptionHandler = actionExceptionHandler || controllerExceptionHandler || this.defaultExceptionHandler;
    }
    ControllerDispatcher.prototype.applyAction = function (action, instance, parameters) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var result = action.apply(instance, parameters);
                _this.handleResult(result).then(resolve, reject);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    ControllerDispatcher.prototype.defaultExceptionHandler = function (context, error) {
        context.httpContext.response.status(500);
        context.httpContext.next(error);
    };
    ControllerDispatcher.prototype.handleResult = function (result) {
        if (result instanceof Promise) {
            return this.handlePromiseResult(result);
        }
        if (this.isActionResult(result)) {
            return this.handleActionResult(result);
        }
        if (result instanceof response_message_1.ResponseMessage) {
            return this.handleResponseMessageResult(result);
        }
        return Promise.resolve(new response_message_1.ResponseMessage(result));
    };
    ControllerDispatcher.prototype.isActionResult = function (object) {
        return typeof (object) === 'object' && 'executeAsync' in object;
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
        return Promise.resolve(result);
    };
    ControllerDispatcher.prototype.instantiateController = function (context) {
        var instance = new this.controller();
        instance._context = context;
        return instance;
    };
    ControllerDispatcher.prototype.getActionContext = function (req) {
        var httpContext = this.getHttpContext(req);
        var controllerDiscriptor = new http_controller_descriptor_1.HttpControllerDescriptor();
        var actionDescriptor = new http_action_descriptor_1.HttpActionDescriptor();
        controllerDiscriptor.controller = this.controller;
        controllerDiscriptor.controllerName = this.controller['name'];
        actionDescriptor.actionName = this.action;
        actionDescriptor.bindings = this.bindings;
        actionDescriptor.returnType = this.returnType;
        return new http_action_context_1.HttpActionContext(httpContext, controllerDiscriptor, actionDescriptor);
    };
    ControllerDispatcher.prototype.getHttpContext = function (req) {
        return http_context_provider_1.HttpContextProvider.getContext(req);
    };
    return ControllerDispatcher;
}());
exports.ControllerDispatcher = ControllerDispatcher;
