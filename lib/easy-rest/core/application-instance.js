"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var metadata_keys_1 = require("../metadata/metadata-keys");
var path_builder_1 = require("../util/path-builder");
var controller_dispatcher_1 = require("../api/controller-dispatcher");
var metadata_1 = require("../metadata/metadata");
var default_authentication_provider_1 = require("../security/authentication/default-authentication-provider");
var http_context_provider_1 = require("../util/http-context-provider");
var authorization_filter_1 = require("../security/authorization/authorization-filter");
var http_context_1 = require("../http/http-context");
var cache_1 = require("../caching/cache");
var module_loader_1 = require("./module-loader");
var ApplicationInstance = (function () {
    function ApplicationInstance() {
        this.express = express();
        this.controllersPathPattern = __dirname + '/controllers/**/*.js';
        this.requestHandlers = [];
        this.parsers = [bodyParser.json()];
        this.authenticationProvider = new default_authentication_provider_1.DefaultAuthenticationProvider();
    }
    ApplicationInstance.prototype.middleware = function () {
        this.loadModules();
        this.initializeContext();
        this.configHandlers();
        this.configParsers();
        this.configAuthProvider();
        this.configRouter();
        this.configErrorHandler();
        return this.express;
    };
    ApplicationInstance.prototype.getAuthorizationFilter = function () {
        return new authorization_filter_1.AuthorizationFilter();
    };
    ApplicationInstance.prototype.onError = function (error, httpContext) {
        httpContext.response.status(500).json(error);
        httpContext.next(error);
    };
    ApplicationInstance.prototype.loadModules = function () {
        module_loader_1.ModuleLoader.load(this.controllersPathPattern);
    };
    ApplicationInstance.prototype.initializeContext = function () {
        this.express.use(function (req, res, next) {
            var httpContext = new http_context_1.HttpContext(req, res, next);
            httpContext.cache = cache_1.Cache.instance;
            http_context_provider_1.HttpContextProvider.setContext(req, httpContext);
            next();
        });
    };
    ApplicationInstance.prototype.configAuthProvider = function () {
        var _this = this;
        this.express.use(function (req, res, next) {
            if (!_this.authenticationProvider) {
                return next();
            }
            _this.authenticationProvider.onAuthentication(req, res)
                .then(function (principal) {
                var context = http_context_provider_1.HttpContextProvider.getContext(req);
                context.user = principal || null;
                next();
            })
                .catch(function (error) { return next(error); });
        });
    };
    ApplicationInstance.prototype.configParsers = function () {
        if (this.parsers.length !== 0) {
            this.express.use(this.parsers);
        }
    };
    ApplicationInstance.prototype.configHandlers = function () {
        var _this = this;
        this.express.use(function (req, res, next) {
            if (_this.requestHandlers.length === 0) {
                return next();
            }
            try {
                var promise = Promise.resolve();
                var _loop_1 = function(i) {
                    var handler = _this.requestHandlers[i];
                    promise = promise.then(function () { return handler(req, res); });
                };
                for (var i = 0; i < _this.requestHandlers.length; i++) {
                    _loop_1(i);
                }
                promise
                    .then(function () { return next(); })
                    .catch(function (error) { return next(error); });
            }
            catch (error) {
                next(error);
            }
        });
    };
    ApplicationInstance.prototype.configErrorHandler = function () {
        var _this = this;
        this.express.use(function (err, req, res, next) {
            try {
                var httpContext = http_context_provider_1.HttpContextProvider.getContext(req);
                _this.onError(err, httpContext);
            }
            catch (error) {
                next(error);
            }
        });
    };
    ApplicationInstance.prototype.configRouter = function () {
        var controllers = module_loader_1.ModuleLoader.controllers;
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var controller = controllers_1[_i];
            var ctrlOptions = metadata_1.Metadata.get(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, controller) || {};
            var actions = metadata_1.Metadata.get(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, controller.prototype);
            for (var _a = 0, actions_1 = actions; _a < actions_1.length; _a++) {
                var action = actions_1[_a];
                var methodOptions = metadata_1.Metadata.get(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
                if (ctrlOptions.basePath && typeof (methodOptions.path) !== 'string') {
                    throw new Error("ApiController string basePath incompatible with ApiMethod RegExp path. " + controller['name'] + ":" + action);
                }
                var path = path_builder_1.PathBuilder.build(ctrlOptions.basePath, methodOptions.path, action);
                var dispatcher = new controller_dispatcher_1.ControllerDispatcher(this, controller, action);
                this.express[methodOptions.method](path, dispatcher.handleRequest);
            }
        }
    };
    return ApplicationInstance;
}());
exports.ApplicationInstance = ApplicationInstance;
