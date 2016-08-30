"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("../index");
var simple_controller_1 = require("./controllers/simple.controller");
var book_controller_1 = require("./controllers/book.controller");
var user_controller_1 = require("./controllers/user.controller");
var SimpleApp = (function (_super) {
    __extends(SimpleApp, _super);
    function SimpleApp() {
        _super.call(this);
        (_a = this.controllers).push.apply(_a, [simple_controller_1.SimpleController, book_controller_1.BookController, user_controller_1.UserController]);
        this.requestHandlers.push(this.simpleHandler);
        (_b = this.errorHandlers).push.apply(_b, [this.simpleErrorHandler1, this.simpleErrorHandler2]);
        this.authenticationProvider = this.getAuthProvider();
        var _a, _b;
    }
    SimpleApp.prototype.simpleHandler = function (req, res) {
        console.log('Handle any request here');
        return Promise.resolve();
    };
    SimpleApp.prototype.simpleErrorHandler1 = function (err, req, res) {
        console.log("Log error: " + err);
        return Promise.resolve(err);
    };
    SimpleApp.prototype.simpleErrorHandler2 = function (err, req, res) {
        console.log("Handle error");
        res.status(500).send('Sorry, service temporarily unavailable.');
        return Promise.reject(null);
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
