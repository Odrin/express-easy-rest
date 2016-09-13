"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("../index");
var SimpleApp = (function (_super) {
    __extends(SimpleApp, _super);
    function SimpleApp() {
        _super.call(this);
        this.controllersPathPattern = __dirname + '/controllers/**/*.js';
        this.authenticationProvider = this.getAuthProvider();
    }
    SimpleApp.prototype.onRequest = function (httpContext) {
        console.log('Handle any request here');
        httpContext.next();
    };
    SimpleApp.prototype.onError = function (error, httpContext) {
        if (!httpContext.response.headersSent) {
            httpContext.response.status(500);
            httpContext.response.send('Sorry, service temporarily unavailable.');
        }
        httpContext.next();
    };
    SimpleApp.prototype.getAuthProvider = function () {
        return {
            onAuthentication: function (req, res) {
                var session = req['session'] || {};
                var principal = {
                    identity: {
                        authenticationType: 'form',
                        isAuthenticated: !!session.login,
                        name: session.login || null
                    },
                    isInRole: function (role) {
                        if (session.login === 'Admin') {
                            return true;
                        }
                        return session.login && role === 'user';
                    }
                };
                return Promise.resolve(principal);
            }
        };
    };
    return SimpleApp;
}(index_1.ApplicationInstance));
exports.SimpleApp = SimpleApp;
