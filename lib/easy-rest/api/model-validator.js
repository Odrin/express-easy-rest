"use strict";
var metadata_1 = require("../metadata/metadata");
var metadata_keys_1 = require("../metadata/metadata-keys");
var ModelValidator = (function () {
    function ModelValidator() {
    }
    ModelValidator.prototype.canValidate = function (dataType) {
        return metadata_1.Metadata.has(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
    };
    ModelValidator.prototype.isValid = function (model, dataType) {
        var validators = metadata_1.Metadata.get(metadata_keys_1.VALIDATION_VALIDATORS_KEY, dataType);
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var validator = validators_1[_i];
            var propValid = validator.validate(model[validator.propertyKey]);
            if (!propValid) {
                return false;
            }
        }
        return true;
    };
    return ModelValidator;
}());
exports.ModelValidator = ModelValidator;
