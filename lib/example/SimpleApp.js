"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var application_instance_1 = require("../easy-rest/core/application-instance");
var simple_controller_1 = require("./controllers/simple.controller");
var book_controller_1 = require("./controllers/book.controller");
var SimpleApp = (function (_super) {
    __extends(SimpleApp, _super);
    function SimpleApp() {
        _super.apply(this, arguments);
    }
    SimpleApp.prototype.config = function (configurator) {
        (_a = configurator.controllers).push.apply(_a, [simple_controller_1.SimpleController, book_controller_1.BookController]);
        configurator.requestHandlers.push(simpleHandler);
        (_b = configurator.errorHandlers).push.apply(_b, [simpleErrorHandler1, simpleErrorHandler2]);
        var _a, _b;
    };
    return SimpleApp;
}(application_instance_1.ApplicationInstance));
function simpleHandler(req, res) {
    console.log('Handle any request here');
}
function simpleErrorHandler1(err, req, res) {
    console.log("Log error: " + err);
    return err;
}
function simpleErrorHandler2(err, req, res) {
    console.log("Handle error");
    res.status(500).send('Sorry, service temporarily unavailable.');
    return false;
}
module.exports = SimpleApp;
