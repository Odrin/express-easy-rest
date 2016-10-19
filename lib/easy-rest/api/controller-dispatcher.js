"use strict";
const data_binder_1 = require("./data-binder");
const response_message_1 = require("./action-result/response-message");
const http_context_provider_1 = require("../util/http-context-provider");
const metadata_1 = require("../metadata/metadata");
const metadata_keys_1 = require("../metadata/metadata-keys");
const http_action_context_1 = require("../http/http-action-context");
const http_controller_descriptor_1 = require("../http/http-controller-descriptor");
const http_action_descriptor_1 = require("../http/http-action-descriptor");
const http_error_1 = require("../exceptions/http-error");
const model_validator_1 = require("./validation/model-validator");
const model_validation_error_1 = require("../exceptions/model-validation-error");
class ControllerDispatcher {
    constructor(instance, controller, action) {
        this.instance = instance;
        this.controller = controller;
        this.action = action;
        this.handleRequest = (req, res, next) => {
            try {
                let actionContext = this.getActionContext(req);
                if (this.authorizationFilter && !this.authorizationFilter.onAuthorization(actionContext)) {
                    return next();
                }
                let instance = this.instantiateController(actionContext);
                let action = instance[this.action];
                let parameters = this.dataBinder.getParameters(req);
                this.applyAction(action, instance, parameters)
                    .then((message) => {
                    res.status(message.statusCode);
                    if (message.data) {
                        res.json(message.data);
                    }
                    else {
                        res.send();
                    }
                    next();
                })
                    .catch((error) => {
                    if (error instanceof http_error_1.HttpError) {
                        res.status(error.getStatus());
                        res.json(error.getMessage());
                        next(error);
                    }
                    else {
                        this.exceptionHandler(actionContext, error);
                    }
                });
            }
            catch (error) {
                if (error instanceof model_validation_error_1.ModelValidationError) {
                    res.status(400);
                    res.json(error.errors);
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
            throw new Error(`Binding configuration error: ${action}`);
        }
        let controllerRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controller);
        let actionRoles = metadata_1.Metadata.get(metadata_keys_1.AUTH_ROLES_METADATA_KEY, controller.prototype, action);
        if (controllerRoles || actionRoles) {
            let roles = [];
            roles
                .concat(controllerRoles || [])
                .concat(actionRoles || [])
                .filter((value, index, array) => array.indexOf(value) === index);
            this.authorizationFilter = instance.getAuthorizationFilter();
            this.authorizationFilter.roles = roles;
        }
        let controllerExceptionHandler = metadata_1.Metadata.get(metadata_keys_1.CONTROLLER_EXCEPTION_FILTER_METADATA_KEY, controller);
        let actionExceptionHandler = metadata_1.Metadata.get(metadata_keys_1.ACTION_EXCEPTION_FILTER_METADATA_KEY, controller.prototype, action);
        this.exceptionHandler = actionExceptionHandler || controllerExceptionHandler || this.defaultExceptionHandler;
    }
    applyAction(action, instance, parameters) {
        return new Promise((resolve, reject) => {
            try {
                let result = action.apply(instance, parameters);
                this.handleResult(result).then(resolve, reject);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    defaultExceptionHandler(context, error) {
        context.httpContext.response.status(500);
        context.httpContext.next(error);
    }
    handleResult(result) {
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
    }
    isActionResult(object) {
        return typeof (object) === 'object' && 'executeAsync' in object;
    }
    handlePromiseResult(result) {
        if (!result) {
            throw new Error(`Action return type error. Expected: Promise, got: ${result}`);
        }
        return result.then((data) => this.handleResult(data));
    }
    handleActionResult(result) {
        if (!result) {
            throw new Error(`Action return type error. Expected: IActionResult, got: ${result}`);
        }
        return result.executeAsync();
    }
    handleResponseMessageResult(result) {
        if (!result) {
            throw new Error(`Action return type error. Expected: ResponseMessage, got: ${result}`);
        }
        return Promise.resolve(result);
    }
    instantiateController(context) {
        var instance = new this.controller();
        instance._context = context;
        return instance;
    }
    getActionContext(req) {
        let httpContext = this.getHttpContext(req);
        let controllerDiscriptor = new http_controller_descriptor_1.HttpControllerDescriptor();
        let actionDescriptor = new http_action_descriptor_1.HttpActionDescriptor();
        controllerDiscriptor.controller = this.controller;
        controllerDiscriptor.controllerName = this.controller['name'];
        actionDescriptor.actionName = this.action;
        actionDescriptor.bindings = this.bindings;
        actionDescriptor.returnType = this.returnType;
        return new http_action_context_1.HttpActionContext(httpContext, controllerDiscriptor, actionDescriptor);
    }
    getHttpContext(req) {
        return http_context_provider_1.HttpContextProvider.getContext(req);
    }
}
exports.ControllerDispatcher = ControllerDispatcher;
