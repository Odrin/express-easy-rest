"use strict";
var metadata_1 = require("../../metadata/metadata");
var metadata_keys_1 = require("../../metadata/metadata-keys");
function authorize() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, parameterIndex) {
        metadata_1.Metadata.define(metadata_keys_1.AUTH_ROLES_METADATA_KEY, roles, target, propertyKey);
    };
}
exports.authorize = authorize;
