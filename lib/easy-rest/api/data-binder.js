"use strict";
var binding_type_1 = require("../decorators/binding/binding-type");
var model_validation_error_1 = require("../exceptions/model-validation-error");
var DataBinder = (function () {
    function DataBinder(bindings, validator) {
        this.bindings = bindings;
        this.validator = validator;
    }
    DataBinder.prototype.getParameters = function (req) {
        var parameters = [];
        for (var i = 0; i < this.bindings.length; i++) {
            var binding = this.bindings[i];
            var source = DataBinder.getBindingSource(req, binding.bindingType) || {};
            var value = DataBinder.getBindingValue(source, binding.propertyKey);
            if (this.validator.canValidate(binding.dataType)) {
                if (!this.validator.isValid(value, binding.dataType)) {
                    throw new model_validation_error_1.ModelValidationError(binding.propertyKey, value);
                }
            }
            parameters[binding.parameterIndex] = DataBinder.convertValue(value, binding.dataType);
        }
        return parameters;
    };
    DataBinder.convertValue = function (value, dataType) {
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
    DataBinder.getBindingValue = function (source, propertyKey) {
        if (!propertyKey) {
            return source;
        }
        else {
            return source[propertyKey];
        }
    };
    DataBinder.getBindingSource = function (req, bindingType) {
        switch (bindingType) {
            case binding_type_1.BindingType.body:
                return req.body;
            case binding_type_1.BindingType.route:
                return req.params;
            default:
                throw new Error("Unsupported binding type: " + bindingType);
        }
    };
    return DataBinder;
}());
exports.DataBinder = DataBinder;
