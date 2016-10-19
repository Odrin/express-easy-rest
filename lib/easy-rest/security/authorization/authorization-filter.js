"use strict";
const metadata_keys_1 = require("../../metadata/metadata-keys");
const metadata_1 = require("../../metadata/metadata");
class AuthorizationFilter {
    get roles() {
        return this._roles || [];
    }
    set roles(value) {
        this._roles = value;
    }
    onAuthorization(actionContext) {
        if (this.skipAuthorization(actionContext)) {
            return true;
        }
        if (!this.isAuthorized(actionContext)) {
            this.handleUnauthorizedRequest(actionContext.httpContext);
            return false;
        }
        return true;
    }
    isAuthorized(actionContext) {
        let user = actionContext.httpContext.user;
        if (!user || !user.identity || !user.identity.isAuthenticated) {
            return false;
        }
        if (this.roles.length !== 0) {
            let hasRole = false;
            for (let role of this.roles) {
                hasRole = hasRole || user.isInRole(role);
            }
            if (!hasRole) {
                return false;
            }
        }
        return true;
    }
    handleUnauthorizedRequest(httpContext) {
        httpContext.response.status(401).send();
    }
    skipAuthorization(actionContext) {
        let target = actionContext.controllerDescriptor.controller.prototype;
        let key = actionContext.actionDescriptor.actionName;
        return metadata_1.Metadata.get(metadata_keys_1.AUTH_ANONYMOUS_METADATA_KEY, target, key);
    }
}
exports.AuthorizationFilter = AuthorizationFilter;
