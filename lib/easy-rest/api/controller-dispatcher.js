"use strict";
var es6_promise_1 = require("es6-promise");
var data_binder_1 = require("./data-binder");
var response_message_1 = require("./action-result/response-message");
var http_context_provider_1 = require("../util/http-context-provider");
var metadata_1 = require("../metadata/metadata");
var metadata_keys_1 = require("../metadata/metadata-keys");
var http_action_context_1 = require("../http/http-action-context");
var http_controller_descriptor_1 = require("../http/http-controller-descriptor");
var http_action_descriptor_1 = require("../http/http-action-descriptor");
var ControllerDispatcher = (function () {
    function ControllerDispatcher(instance, controller, action) {
        var _this = this;
        this.instance = instance;
        this.controller = controller;
        this.action = action;
        this.handleRequest = function (req, res, next) {
            try {
                var actionContext = _this.getActionContext(req);
                if (_this.authorizationFilter && !_this.authorizationFilter.onAuthorization(actionContext)) {
                    return next();
                }
                var instance = _this.instantiateController(actionContext);
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
        this.returnType = metadata_1.Metadata.getReturnType(controller.prototype, action);
        this.bindings = metadata_1.Metadata.get(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
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
        return es6_promise_1.Promise.resolve(result);
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
