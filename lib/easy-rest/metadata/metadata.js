"use strict";
class Metadata {
    static has(metadataKey, target, targetKey) {
        if (targetKey) {
            return Reflect.hasMetadata(metadataKey, target, targetKey);
        }
        else {
            return Reflect.hasMetadata(metadataKey, target);
        }
    }
    static get(metadataKey, target, targetKey) {
        if (targetKey) {
            return Reflect.getMetadata(metadataKey, target, targetKey);
        }
        else {
            return Reflect.getMetadata(metadataKey, target);
        }
    }
    static define(metadataKey, metadataValue, target, targetKey) {
        if (targetKey) {
            Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
        }
        else {
            Reflect.defineMetadata(metadataKey, metadataValue, target);
        }
    }
    static append(metadataKey, metadataValue, target, targetKey) {
        let values = Metadata.get(metadataKey, target, targetKey) || [];
        values.push(metadataValue);
        Metadata.define(metadataKey, values, target, targetKey);
    }
    static getParamTypes(target, targetKey) {
        return Reflect.getMetadata('design:paramtypes', target, targetKey);
    }
    static getReturnType(target, targetKey) {
        return Reflect.getMetadata('design:returntype', target, targetKey);
    }
}
exports.Metadata = Metadata;
