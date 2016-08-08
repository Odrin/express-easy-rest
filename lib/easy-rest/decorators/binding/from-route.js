"use strict";
var metadata_keys_1 = require("../metadata-keys");
var binding_type_1 = require("./binding-type");
function fromRoute(propertyKey) {
    return function (target, targetKey, parameterIndex) {
        var bindings = Reflect.getMetadata(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, target, targetKey) || [];
        var paramTypes = Reflect.getMetadata('design:paramtypes', target, targetKey);
        var dataType = paramTypes[parameterIndex];
        bindings.push({
            bindingType: binding_type_1.BindingType.route,
            parameterIndex: parameterIndex,
            propertyKey: propertyKey,
            dataType: dataType
        });
        Reflect.defineMetadata(metadata_keys_1.ACTION_BINDINGS_METADATA_KEY, bindings, target, targetKey);
    };
}
exports.fromRoute = fromRoute;
