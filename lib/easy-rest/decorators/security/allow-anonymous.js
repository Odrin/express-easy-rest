"use strict";
const metadata_1 = require("../../metadata/metadata");
const metadata_keys_1 = require("../../metadata/metadata-keys");
function AllowAnonymous() {
    return function (target, propertyKey) {
        metadata_1.Metadata.define(metadata_keys_1.AUTH_ANONYMOUS_METADATA_KEY, true, target, propertyKey);
    };
}
exports.AllowAnonymous = AllowAnonymous;
