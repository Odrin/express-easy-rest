"use strict";
var decorator_factory_1 = require("./decorator-factory");
function Required() {
    return decorator_factory_1.decoratorFactory(function (value) {
        var valid = !!value;
        return {
            valid: valid,
            error: !valid ? 'Property is required' : undefined
        };
    });
}
exports.Required = Required;
