"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var metadata_keys_1 = require("../metadata/metadata-keys");
var path_builder_1 = require("../util/path-builder");
var controller_dispatcher_1 = require("../controller/controller-dispatcher");
var metadata_1 = require("../metadata/metadata");
var EasyRestConfig = (function () {
    function EasyRestConfig(Cls) {
        this.controllers = [];
        this.requestHandlers = [];
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
    EasyRestConfig.prototype.configParsers = function () {
        if (this.parsers.length !== 0) {
            this.express.use(this.parsers);
        }
    };
    EasyRestConfig.prototype.configHandlers = function () {
        var _this = this;
        this.express.use(function (req, res, next) {
            try {
                for (var i = 0; i < _this.requestHandlers.length; i++) {
                    var handler = _this.requestHandlers[i];
                    handler(req, res);
                }
                next();
            }
            catch (error) {
                next(error);
            }
        });
    };
    EasyRestConfig.prototype.configErrorHandlers = function () {
        var _this = this;
        this.express.use(function (err, req, res, next) {
            try {
                var error = err;
                for (var i = 0; i < _this.errorHandlers.length; i++) {
                    var handler = _this.errorHandlers[i];
                    error = handler(error, req, res);
                    if (!error) {
                        next();
                        return;
                    }
                }
                next(err);
            }
            catch (error) {
                next(error);
            }
        });
    };
    EasyRestConfig.prototype.configRouter = function () {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            var ctrlOptions = metadata_1.Metadata.get(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, controller) || {};
            var actions = metadata_1.Metadata.get(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, controller.prototype);
            for (var _b = 0, actions_1 = actions; _b < actions_1.length; _b++) {
                var action = actions_1[_b];
                var methodOptions = metadata_1.Metadata.get(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
                var bindings = metadata_1.Metadata.get(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, controller.prototype, action) || [];
                var returnType = metadata_1.Metadata.getReturnType(controller.prototype, action);
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
