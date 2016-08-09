"use strict";
var metadata_keys_1 = require("../../metadata/metadata-keys");
var metadata_1 = require("../../metadata/metadata");
function controller(options) {
    return function (target) {
        if (metadata_1.Metadata.has(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, target)) {
            throw new Error("Duplicate ApiController decorator on \"" + target['name'] + "\"");
        }
        metadata_1.Metadata.define(metadata_keys_1.CONTROLLER_OPTIONS_METADATA_KEY, options, target);
    };
}
exports.controller = controller;
