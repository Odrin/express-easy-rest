"use strict";
var metadata_1 = require("../../metadata/metadata");
var metadata_keys_1 = require("../../metadata/metadata-keys");
function AllowAnonymous() {
    return function (target, propertyKey, parameterIndex) {
        metadata_1.Metadata.define(metadata_keys_1.AUTH_ANONYMOUS_METADATA_KEY, true, target, propertyKey);
    };
}
exports.AllowAnonymous = AllowAnonymous;
