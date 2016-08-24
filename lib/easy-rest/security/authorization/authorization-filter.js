"use strict";
var metadata_keys_1 = require("../../metadata/metadata-keys");
var metadata_1 = require("../../metadata/metadata");
var AuthorizationFilter = (function () {
    function AuthorizationFilter() {
    }
    AuthorizationFilter.prototype.onAuthorization = function (actionContext) {
        if (this.skipAuthorization(actionContext)) {
            return true;
        }
        if (!this.isAuthorized(actionContext)) {
            this.handleUnauthorizedRequest(actionContext.httpContext);
            return false;
        }
        return true;
    };
    AuthorizationFilter.prototype.isAuthorized = function (actionContext) {
        var user = actionContext.httpContext.user;
        if (!user || !user.identity || !user.identity.isAuthenticated) {
            return false;
        }
        if (this.roles.length !== 0) {
            var hasRole = false;
            for (var role in this.roles) {
                hasRole = hasRole || user.isInRole(role);
            }
            if (!hasRole) {
                return false;
            }
        }
        return true;
    };
    AuthorizationFilter.prototype.handleUnauthorizedRequest = function (httpContext) {
        httpContext.response.status(401).send();
    };
    AuthorizationFilter.prototype.skipAuthorization = function (actionContext) {
        var target = actionContext.controllerDescriptor.controller.prototype;
        var key = actionContext.actionDescriptor.actionName;
        return metadata_1.Metadata.get(metadata_keys_1.AUTH_ANONYMOUS_METADATA_KEY, target, key);
    };
    return AuthorizationFilter;
}());
exports.AuthorizationFilter = AuthorizationFilter;
