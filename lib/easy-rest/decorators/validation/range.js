"use strict";
var decorator_factory_1 = require("./decorator-factory");
function Range(minimum, maximum) {
    return decorator_factory_1.decoratorFactory(function (value) {
        var valid = typeof (value) === 'number' && value >= minimum && value <= maximum;
        return {
            valid: valid,
            error: !valid ? 'Input number out of range' : undefined
        };
    });
}
exports.Range = Range;
