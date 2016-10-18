"use strict";
var decorator_factory_1 = require("./decorator-factory");
function Range(minimum, maximum) {
    return decorator_factory_1.decoratorFactory(function (value) { return typeof (value) === 'number' && value >= minimum && value <= maximum; });
}
exports.Range = Range;
