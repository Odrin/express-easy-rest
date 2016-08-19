"use strict";
var context_data_provider_1 = require("../../util/context-data-provider");
var AuthorizationFilter = (function () {
    function AuthorizationFilter() {
    }
    AuthorizationFilter.prototype.onAuthorization = function (req, res) {
        if (!this.isAuthorized(req)) {
            this.handleUnauthorizedRequest(res);
            return false;
        }
        return true;
    };
    AuthorizationFilter.prototype.isAuthorized = function (req) {
        var user = context_data_provider_1.ContextDataProvider.getData(req, 'principal');
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
    AuthorizationFilter.prototype.handleUnauthorizedRequest = function (res) {
        res.status(401).send();
    };
    return AuthorizationFilter;
}());
exports.AuthorizationFilter = AuthorizationFilter;
