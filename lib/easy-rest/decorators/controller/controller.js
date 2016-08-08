"use strict";
require("reflect-metadata");
var metadata_keys_1 = require("../metadata-keys");
function controller(options) {
    return function (target) {
        if (Reflect.hasMetadata(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, target)) {
            throw new Error("Duplicate ApiController decorator on \"" + target['name'] + "\"");
        }
        Reflect.defineMetadata(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, options, target);
    };
}
exports.controller = controller;
