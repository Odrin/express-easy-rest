"use strict";
var HttpActionContext = (function () {
    function HttpActionContext(httpContext, controllerDescriptor, actionDescriptor) {
        this.httpContext = httpContext;
        this.controllerDescriptor = controllerDescriptor;
        this.actionDescriptor = actionDescriptor;
    }
    return HttpActionContext;
}());
exports.HttpActionContext = HttpActionContext;
