"use strict";
require("reflect-metadata");
var metadata_keys_1 = require("../metadata-keys");
function action(options) {
    return function (target, propertyKey, descriptor) {
        if (Reflect.hasMetadata(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, target, propertyKey)) {
            throw new Error("Duplicate ApiAction decorator on \"" + propertyKey + "\"");
        }
        var methods = Reflect.getMetadata(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, target) || [];
        methods.push(propertyKey);
        Reflect.defineMetadata(metadata_keys_1.ACTION_DECLARATION_METADATA_KEY, methods, target);
        Reflect.defineMetadata(metadata_keys_1.ACTION_OPTIONS_METADATA_KEY, options, target, propertyKey);
    };
}
exports.action = action;
