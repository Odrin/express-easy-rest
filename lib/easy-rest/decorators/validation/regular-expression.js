"use strict";
var decorator_factory_1 = require("./decorator-factory");
function RegularExpression(regExp) {
    if (!regExp) {
        throw new Error("Decorator config error; regExp: " + regExp);
    }
    return decorator_factory_1.decoratorFactory(function (value) {
        var valid = typeof (value) === 'string' && regExp.test(value);
        return {
            valid: valid,
            error: !valid ? 'Input value does not match the specific regular expression' : undefined
        };
    });
}
exports.RegularExpression = RegularExpression;
