"use strict";
var metadata_keys_1 = require("../../metadata/metadata-keys");
var metadata_1 = require("../../metadata/metadata");
function decoratorFactory(validate) {
    return function (target, propertyKey) {
        metadata_1.Metadata.append(metadata_keys_1.VALIDATION_VALIDATORS_KEY, { propertyKey: propertyKey, validate: validate }, target.constructor);
    };
}
exports.decoratorFactory = decoratorFactory;
