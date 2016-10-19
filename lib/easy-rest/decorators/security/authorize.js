"use strict";
const metadata_1 = require("../../metadata/metadata");
const metadata_keys_1 = require("../../metadata/metadata-keys");
function Authorize(...roles) {
    return function (target, propertyKey) {
        metadata_1.Metadata.define(metadata_keys_1.AUTH_ROLES_METADATA_KEY, roles, target, propertyKey);
    };
}
exports.Authorize = Authorize;
