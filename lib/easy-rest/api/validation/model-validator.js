"use strict";
const metadata_1 = require("../../metadata/metadata");
const metadata_keys_1 = require("../../metadata/metadata-keys");
const model_validation_result_1 = require("./model-validation-result");
class ModelValidator {
    canValidate(dataType) {
        return metadata_1.Metadata.has(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
    }
    validate(model, dataType) {
        let validators = metadata_1.Metadata.get(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
        let modelValidationResult = new model_validation_result_1.ModelValidationResult();
        for (let i = 0; i < validators.length; i++) {
            let validator = validators[i];
            let validationResult = validator.validate(model[validator.propertyKey]);
            modelValidationResult.add(validator.propertyKey, validationResult);
        }
        return modelValidationResult;
    }
}
exports.ModelValidator = ModelValidator;
