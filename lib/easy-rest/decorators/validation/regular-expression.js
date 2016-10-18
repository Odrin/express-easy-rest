"use strict";
var decorator_factory_1 = require("./decorator-factory");
function RegularExpression(regExp) {
    if (!regExp) {
        throw new Error("Decorator config error; regExp: " + regExp);
    }
    return decorator_factory_1.decoratorFactory(function (value) { return typeof (value) === 'string' && regExp.test(value); });
}
exports.RegularExpression = RegularExpression;
