"use strict";
var es6_promise_1 = require("es6-promise");
var data_binder_1 = require("./data-binder");
var response_message_1 = require("./action-result/response-message");
var context_data_provider_1 = require("../util/context-data-provider");
var metadata_1 = require("../metadata/metadata");
var metadata_keys_1 = require("../metadata/metadata-keys");
var ControllerDispatcher = (function () {
    function ControllerDispatcher(instance, controllerConctructor, action) {
        var _this = this;
        this.instance = instance;
        this.controllerConctructor = controllerConctructor;
        this.action = action;
        this.handleRequest = function (req, res, next) {
            try {
                if (_this.authorizationFilter && !_this.authorizationFilter.onAuthorization(req, res)) {
                    return next();
                }
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
        this.bindings = metadata_1.Metadata.get(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, controllerConctructor.prototype, action) || [];
        if (controllerConctructor.prototype[action].length !== this.bindings.length) {
            throw new Error("Binding configuration error: " + action);
        }
        var controllerRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controllerConctructor);
        var actionRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controllerConctructor.prototype, action);
        if (controllerRoles || actionRoles) {
            var allowAnonymous = metadata_1.Metadata.get(metadata_keys_1.AUTH_ANONYMOUS_METADATA_KEY, controllerConctructor.prototype, action);
            if (!allowAnonymous) {
                var roles = []
                    .concat(controllerRoles || [])
                    .concat(actionRoles || [])
                    .filter(function (value, index, array) { return array.indexOf(value) === index; });
                this.authorizationFilter = instance.getAuthorizationFilter();
                this.authorizationFilter.roles = roles;
            }
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
        instance.user = context_data_provider_1.ContextDataProvider.getData(req, 'principal');
        return instance;
    };
    return ControllerDispatcher;
}());
exports.ControllerDispatcher = ControllerDispatcher;
