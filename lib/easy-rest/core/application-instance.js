"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const metadata_keys_1 = require("../metadata/metadata-keys");
const path_builder_1 = require("../util/path-builder");
const controller_dispatcher_1 = require("../api/controller-dispatcher");
const metadata_1 = require("../metadata/metadata");
const default_authentication_provider_1 = require("../security/authentication/default-authentication-provider");
const http_context_provider_1 = require("../util/http-context-provider");
const authorization_filter_1 = require("../security/authorization/authorization-filter");
const http_context_1 = require("../http/http-context");
const cache_1 = require("../caching/cache");
const module_loader_1 = require("./module-loader");
class ApplicationInstance {
    constructor() {
        this.express = express();
        this.controllersPathPattern = __dirname + '/controllers/**/*.js';
        this.parsers = [bodyParser.json()];
        this.authenticationProvider = new default_authentication_provider_1.DefaultAuthenticationProvider();
    }
    middleware() {
        this.loadModules();
        this.initializeContext();
        this.configRequestHandler();
        this.configParsers();
        this.configAuthProvider();
        this.configRouter();
        this.configErrorHandler();
        return this.express;
    }
    getAuthorizationFilter() {
        return new authorization_filter_1.AuthorizationFilter();
    }
    onRequest(httpContext) {
        httpContext.next();
    }
    onError(error, httpContext) {
        if (!httpContext.response.headersSent) {
            httpContext.response.status(500);
            httpContext.response.json(error);
        }
        httpContext.next(error);
    }
    loadModules() {
        module_loader_1.ModuleLoader.load(this.controllersPathPattern);
    }
    initializeContext() {
        this.express.use((req, res, next) => {
            let httpContext = new http_context_1.HttpContext(req, res, next);
            httpContext.cache = cache_1.Cache.instance;
            http_context_provider_1.HttpContextProvider.setContext(req, httpContext);
            next();
        });
    }
    configAuthProvider() {
        this.express.use((req, res, next) => {
            if (!this.authenticationProvider) {
                return next();
            }
            this.authenticationProvider.onAuthentication(req, res)
                .then((principal) => {
                let context = http_context_provider_1.HttpContextProvider.getContext(req);
                context.user = principal || null;
                next();
            })
                .catch((error) => next(error));
        });
    }
    configParsers() {
        if (this.parsers.length !== 0) {
            this.express.use(this.parsers);
        }
    }
    configRequestHandler() {
        this.express.use((req, res, next) => {
            try {
                let httpContext = http_context_provider_1.HttpContextProvider.getContext(req);
                this.onRequest(httpContext);
            }
            catch (error) {
                next(error);
            }
        });
    }
    configErrorHandler() {
        this.express.use((err, req, res, next) => {
            try {
                let httpContext = http_context_provider_1.HttpContextProvider.getContext(req);
                this.onError(err, httpContext);
            }
            catch (error) {
                next(error);
            }
        });
    }
    configRouter() {
        let controllers = module_loader_1.ModuleLoader.controllers;
        for (let controller of controllers) {
            let ctrlOptions = metadata_1.Metadata.get(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, controller) || {};
            let actions = metadata_1.Metadata.get(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, controller.prototype);
            for (let action of actions) {
                let methodOptions = metadata_1.Metadata.get(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, controller.prototype, action);
                if (ctrlOptions.basePath && typeof (methodOptions.path) !== 'string') {
                    throw new Error(`ApiController string basePath incompatible with ApiMethod RegExp path. ${controller['name']}:${action}`);
                }
                let path = path_builder_1.PathBuilder.build(ctrlOptions.basePath, methodOptions.path, action);
                let dispatcher = new controller_dispatcher_1.ControllerDispatcher(this, controller, action);
                this.express[methodOptions.method](path, dispatcher.handleRequest);
            }
        }
    }
}
exports.ApplicationInstance = ApplicationInstance;
