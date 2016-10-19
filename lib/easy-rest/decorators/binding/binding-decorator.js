"use strict";
const metadata_1 = require("../../metadata/metadata");
const metadata_keys_1 = require("../../metadata/metadata-keys");
function bindingDecorator(bindingType, propertyKey) {
    return function (target, targetKey, parameterIndex) {
        let paramTypes = metadata_1.Metadata.getParamTypes(target, targetKey);
        let dataType = paramTypes[parameterIndex];
        let binding = {
            bindingType,
            parameterIndex,
            propertyKey,
            dataType
        };
        metadata_1.Metadata.append(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, binding, target, targetKey);
    };
}
exports.bindingDecorator = bindingDecorator;
