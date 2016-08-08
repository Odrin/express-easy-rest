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
        configurator.handlers.push(simpleHandler);
        configurator.errorHandlers.push(simpleErrorHandler);
        var _a;
    };
    return SimpleApp;
}(application_instance_1.ApplicationInstance));
function simpleHandler(req, res, next) {
    console.log('Handle any request here');
    next();
}
function simpleErrorHandler(err, req, res, next) {
    console.log("Handle error here: " + err);
    next();
}
module.exports = SimpleApp;
