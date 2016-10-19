"use strict";
const binding_type_1 = require("../decorators/binding/binding-type");
const model_validation_error_1 = require("../exceptions/model-validation-error");
class DataBinder {
    constructor(bindings, validator) {
        this.bindings = bindings;
        this.validator = validator;
    }
    getParameters(req) {
        let parameters = [];
        for (let i = 0; i < this.bindings.length; i++) {
            let binding = this.bindings[i];
            let source = DataBinder.getBindingSource(req, binding.bindingType) || {};
            let value = DataBinder.getBindingValue(source, binding.propertyKey);
            if (this.validator.canValidate(binding.dataType)) {
                let validationResult = this.validator.validate(value, binding.dataType);
                if (!validationResult.valid) {
                    throw new model_validation_error_1.ModelValidationError(validationResult.errors);
                }
            }
            parameters[binding.parameterIndex] = DataBinder.convertValue(value, binding.dataType);
        }
        return parameters;
    }
    static convertValue(value, dataType) {
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
    }
    static getBindingValue(source, propertyKey) {
        if (!propertyKey) {
            return source;
        }
        else {
            return source[propertyKey];
        }
    }
    static getBindingSource(req, bindingType) {
        switch (bindingType) {
            case binding_type_1.BindingType.body:
                return req.body;
            case binding_type_1.BindingType.route:
                return req.params;
            default:
                throw new Error(`Unsupported binding type: ${bindingType}`);
        }
    }
}
exports.DataBinder = DataBinder;
