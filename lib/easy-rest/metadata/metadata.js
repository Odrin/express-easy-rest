"use strict";
var Metadata = (function () {
    function Metadata() {
    }
    Metadata.has = function (metadataKey, target, targetKey) {
        return Reflect.hasMetadata(metadataKey, target, targetKey);
    };
    Metadata.get = function (metadataKey, target, targetKey) {
        return Reflect.getMetadata(metadataKey, target, targetKey);
    };
    Metadata.define = function (metadataKey, metadataValue, target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    };
    Metadata.append = function (metadataKey, metadataValue, target, targetKey) {
        var values = Metadata.get(metadataKey, target, targetKey) || [];
        values.push(metadataValue);
        Metadata.define(metadataKey, values, target, targetKey);
    };
    Metadata.getParamTypes = function (target, targetKey) {
        return Reflect.getMetadata('design:paramtypes', target, targetKey);
    };
    Metadata.getReturnType = function (target, targetKey) {
        return Reflect.getMetadata('design:returntype', target, targetKey);
    };
    return Metadata;
}());
exports.Metadata = Metadata;
