"use strict";
var metadata_keys_1 = require("../../metadata/metadata-keys");
var metadata_1 = require("../../metadata/metadata");
function Action(options) {
    return function (target, propertyKey, descriptor) {
        if (metadata_1.Metadata.has(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, target, propertyKey)) {
            throw new Error("Duplicate ApiAction decorator on \"" + propertyKey + "\"");
        }
        metadata_1.Metadata.append(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, propertyKey, target);
        metadata_1.Metadata.define(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, options, target, propertyKey);
    };
}
exports.Action = Action;
