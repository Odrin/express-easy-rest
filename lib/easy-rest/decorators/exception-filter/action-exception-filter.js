"use strict";
const metadata_1 = require("../../metadata/metadata");
const metadata_keys_1 = require("../../metadata/metadata-keys");
function ActionExceptionFilter(handler) {
    return function (target, propertyKey, descriptor) {
        metadata_1.Metadata.define(metadata_keys_1.ACTION_EXCEPTION_FILTER_METADATA_KEY, handler, target, propertyKey);
    };
}
exports.ActionExceptionFilter = ActionExceptionFilter;
