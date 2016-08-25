"use strict";
var es6_promise_1 = require("es6-promise");
var DefaultAuthenticationProvider = (function () {
    function DefaultAuthenticationProvider() {
    }
    DefaultAuthenticationProvider.prototype.onAuthentication = function (req, res) {
        return es6_promise_1.Promise.resolve({
            identity: {
                isAuthenticated: false,
                name: null,
                authenticationType: null
            },
            isInRole: function (role) {
                return false;
            }
        });
    };
    ;
    return DefaultAuthenticationProvider;
}());
exports.DefaultAuthenticationProvider = DefaultAuthenticationProvider;
