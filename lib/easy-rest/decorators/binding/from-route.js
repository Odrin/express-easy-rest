"use strict";
var binding_type_1 = require("./binding-type");
var binding_decorator_1 = require("./binding-decorator");
function fromRoute(propertyKey) {
    return binding_decorator_1.bindingDecorator(binding_type_1.BindingType.route, propertyKey);
}
exports.fromRoute = fromRoute;
