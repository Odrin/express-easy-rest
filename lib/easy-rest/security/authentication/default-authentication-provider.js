"use strict";
class DefaultAuthenticationProvider {
    onAuthentication(req, res) {
        return Promise.resolve({
            identity: {
                isAuthenticated: false,
                name: null,
                authenticationType: null
            },
            isInRole(role) {
                return false;
            }
        });
    }
    ;
}
exports.DefaultAuthenticationProvider = DefaultAuthenticationProvider;
