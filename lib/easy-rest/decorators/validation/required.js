"use strict";
var decorator_factory_1 = require("./decorator-factory");
function Required() {
    return decorator_factory_1.decoratorFactory(function (value) { return !!value; });
}
exports.Required = Required;
