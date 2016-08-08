"use strict";
var binding_type_1 = require("../decorators/binding/binding-type");
var DataBinder = (function () {
    function DataBinder(req, bindings) {
        this.req = req;
        this.bindings = bindings;
    }
    DataBinder.prototype.getParameters = function () {
        var parameters = [];
        for (var i = 0; i < this.bindings.length; i++) {
            var binding = this.bindings[i];
            var source = this.getBindingSource(binding.bindingType) || {};
            var value = this.getBindingValue(source, binding.propertyKey);
            parameters[binding.parameterIndex] = this.convertValue(value, binding.dataType);
        }
        return parameters;
    };
    DataBinder.prototype.convertValue = function (value, dataType) {
        if (dataType === String) {
            return value.toString();
        }
        if (dataType === Number) {
            return +value;
        }
        if (dataType === Boolean) {
            return !!value;
        }
        return value;
    };
    DataBinder.prototype.getBindingValue = function (source, propertyKey) {
        if (!propertyKey) {
            return source;
        }
        else {
            return source[propertyKey];
        }
    };
    DataBinder.prototype.getBindingSource = function (bindingType) {
        switch (bindingType) {
            case binding_type_1.BindingType.body:
                return this.req.body;
            case binding_type_1.BindingType.route:
                return this.req.params;
            default:
                throw new Error("Unsupported binding type: " + bindingType);
        }
    };
    DataBinder.prototype.getParameterBinding = function (parameterIndex) {
        for (var i = 0; i < this.bindings.length; i++) {
            if (this.bindings[i].parameterIndex === parameterIndex) {
                return this.bindings[i];
            }
        }
        throw new Error("Parameter binding not found: " + parameterIndex);
    };
    return DataBinder;
}());
exports.DataBinder = DataBinder;
