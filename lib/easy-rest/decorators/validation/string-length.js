"use strict";
var decorator_factory_1 = require("./decorator-factory");
function StringLength(maxLength, minLength) {
    if (maxLength <= 0 || minLength && minLength < 0 || minLength && minLength > maxLength) {
        throw new Error("Decorator config error; maxLength: " + maxLength + ", minLength: " + minLength);
    }
    return decorator_factory_1.decoratorFactory(function (value) {
        var valid = validate(value, maxLength, minLength);
        return {
            valid: valid,
            error: !valid ? 'Input string does not match specific length' : undefined
        };
    });
}
exports.StringLength = StringLength;
function validate(value, maxLength, minLength) {
    if (typeof value !== 'string') {
        return false;
    }
    if (!!minLength && (!value || value.length < minLength)) {
        return false;
    }
    if (value && value.length > maxLength) {
        return false;
    }
    return true;
}
