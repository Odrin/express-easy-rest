"use strict";
class HttpActionContext {
    constructor(httpContext, controllerDescriptor, actionDescriptor) {
        this.httpContext = httpContext;
        this.controllerDescriptor = controllerDescriptor;
        this.actionDescriptor = actionDescriptor;
    }
}
exports.HttpActionContext = HttpActionContext;
