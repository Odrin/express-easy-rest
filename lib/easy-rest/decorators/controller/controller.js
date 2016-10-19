"use strict";
const metadata_keys_1 = require("../../metadata/metadata-keys");
const metadata_1 = require("../../metadata/metadata");
const module_loader_1 = require("../../core/module-loader");
function Controller(options) {
    return function (target) {
        if (metadata_1.Metadata.has(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, target)) {
            throw new Error(`Duplicate ApiController decorator on "${target['name']}"`);
        }
        module_loader_1.ModuleLoader.controllers.push(target);
        if (options) {
            metadata_1.Metadata.define(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, options, target);
        }
    };
}
exports.Controller = Controller;
