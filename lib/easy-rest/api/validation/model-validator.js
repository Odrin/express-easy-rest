"use strict";
var metadata_1 = require("../../metadata/metadata");
var metadata_keys_1 = require("../../metadata/metadata-keys");
var model_validation_result_1 = require("./model-validation-result");
var ModelValidator = (function () {
    function ModelValidator() {
    }
    ModelValidator.prototype.canValidate = function (dataType) {
        return metadata_1.Metadata.has(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
    };
    ModelValidator.prototype.validate = function (model, dataType) {
        var validators = metadata_1.Metadata.get(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
        var modelValidationResult = new model_validation_result_1.ModelValidationResult();
        for (var i = 0; i < validators.length; i++) {
            var validator = validators[i];
            var validationResult = validator.validate(model[validator.propertyKey]);
            modelValidationResult.add(validator.propertyKey, validationResult);
        }
        return modelValidationResult;
    };
    return ModelValidator;
}());
exports.ModelValidator = ModelValidator;
