"use strict";
const decorator_factory_1 = require("./decorator-factory");
function Range(minimum, maximum) {
    return decorator_factory_1.decoratorFactory((value) => {
        let valid = typeof (value) === 'number' && value >= minimum && value <= maximum;
        return {
            valid,
            error: !valid ? 'Input number out of range' : undefined
        };
    });
}
exports.Range = Range;
