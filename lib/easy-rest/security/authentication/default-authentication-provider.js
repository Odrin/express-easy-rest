"use strict";
var DefaultAuthenticationProvider = (function () {
    function DefaultAuthenticationProvider() {
    }
    DefaultAuthenticationProvider.prototype.onAuthentication = function (req, res) {
        return Promise.resolve({
            identity: {
                isAuthenticated: false,
                name: null,
                authenticationType: null
            },
            isInRole: function (role) { return false; }
        });
    };
    ;
    return DefaultAuthenticationProvider;
}());
exports.DefaultAuthenticationProvider = DefaultAuthenticationProvider;
