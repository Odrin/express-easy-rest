"use strict";
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var metadata_keys_1 = require("../decorators/metadata-keys");
var path_builder_1 = require("../util/path-builder");
var controller_dispatcher_1 = require("../controller/controller-dispatcher");
var EasyRestConfig = (function () {
    function EasyRestConfig(Cls) {
        this.controllers = [];
        this.handlers = [];
        this.errorHandlers = [];
        this.parsers = [bodyParser.json()];
        this.express = express();
        this.instance = new Cls();
    }
    EasyRestConfig.create = function (appCls) {
        return new EasyRestConfig(appCls).create();
    };
    EasyRestConfig.prototype.create = function () {
        this.instance.config(this);
        this.configHandlers();
        this.configParsers();
        this.configRouter();
        this.configErrorHandlers();
        return this.express;
    };
    EasyRestConfig.prototype.configHandlers = function () {
        if (this.handlers.length !== 0) {
            this.express.use(this.handlers);
        }
    };
    EasyRestConfig.prototype.configParsers = function () {
        if (this.parsers.length !== 0) {
            this.express.use(this.parsers);
        }
    };
    EasyRestConfig.prototype.configErrorHandlers = function () {
        if (this.errorHandlers.length !== 0) {
            this.express.use(this.errorHandlers);
        }
    };
    EasyRestConfig.prototype.configRouter = function () {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            var ctrlOptions = Reflect.getMetadata(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, controller) || {};
            var actions = Reflect.getMetadata(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, controller.prototype);
            for (var _b = 0, actions_1 = actions; _b < actions_1.length; _b++) {
                var action = actions_1[_b];
                var methodOptions = Reflect.getMetadata(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
                var bindings = Reflect.getMetadata(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
                var returnType = Reflect.getMetadata('design:returntype', controller.prototype, action);
                if (ctrlOptions.basePath && typeof (methodOptions.path) !== 'string') {
                    throw new Error("ApiController string basePath incompatible with ApiMethod RegExp path. " + controller['name'] + ":" + action);
                }
                var path = path_builder_1.PathBuilder.build(ctrlOptions.basePath, methodOptions.path, action);
                var dispatcher = new controller_dispatcher_1.ControllerDispatcher(this, controller, action, bindings, returnType);
                this.express[methodOptions.method](path, dispatcher.handleRequest);
            }
        }
    };
    return EasyRestConfig;
}());
exports.EasyRestConfig = EasyRestConfig;
