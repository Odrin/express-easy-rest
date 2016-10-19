"use strict";
const binding_type_1 = require("./binding-type");
const binding_decorator_1 = require("./binding-decorator");
function FromBody(propertyKey) {
    return binding_decorator_1.bindingDecorator(binding_type_1.BindingType.body, propertyKey);
}
exports.FromBody = FromBody;
