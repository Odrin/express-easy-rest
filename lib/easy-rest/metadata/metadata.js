"use strict";
var Metadata = (function () {
    function Metadata() {
    }
    Metadata.has = function (metadataKey, target, targetKey) {
        if (targetKey) {
            return Reflect.hasMetadata(metadataKey, target, targetKey);
        }
        else {
            return Reflect.hasMetadata(metadataKey, target);
        }
    };
    Metadata.get = function (metadataKey, target, targetKey) {
        if (targetKey) {
            return Reflect.getMetadata(metadataKey, target, targetKey);
        }
        else {
            return Reflect.getMetadata(metadataKey, target);
        }
    };
    Metadata.define = function (metadataKey, metadataValue, target, targetKey) {
        if (targetKey) {
            Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
        }
        else {
            Reflect.defineMetadata(metadataKey, metadataValue, target);
        }
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
