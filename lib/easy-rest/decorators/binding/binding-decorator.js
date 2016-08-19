"use strict";
var metadata_1 = require("../../metadata/metadata");
var metadata_keys_1 = require("../../metadata/metadata-keys");
function bindingDecorator(bindingType, propertyKey) {
    return function (target, targetKey, parameterIndex) {
        var paramTypes = metadata_1.Metadata.getParamTypes(target, targetKey);
        var dataType = paramTypes[parameterIndex];
        var binding = {
            bindingType: bindingType,
            parameterIndex: parameterIndex,
            propertyKey: propertyKey,
            dataType: dataType
        };
        metadata_1.Metadata.append(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, binding, target, targetKey);
    };
}
exports.bindingDecorator = bindingDecorator;
