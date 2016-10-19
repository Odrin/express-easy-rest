"use strict";
const decorator_factory_1 = require("./decorator-factory");
function Required() {
    return decorator_factory_1.decoratorFactory((value) => {
        let valid = !!value;
        return {
            valid,
            error: !valid ? 'Property is required' : undefined
        };
    });
}
exports.Required = Required;
