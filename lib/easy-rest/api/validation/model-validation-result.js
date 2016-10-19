"use strict";
var ModelValidationResult = (function () {
    function ModelValidationResult(results) {
        this.results = results || [];
    }
    ModelValidationResult.prototype.add = function (propertyKey, validationResult) {
        this.results.push({
            propertyKey: propertyKey,
            validationResult: validationResult
        });
    };
    Object.defineProperty(ModelValidationResult.prototype, "valid", {
        get: function () {
            for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!item.validationResult.valid) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelValidationResult.prototype, "errors", {
        get: function () {
            return this.results.filter(function (item) { return !item.validationResult.valid; });
        },
        enumerable: true,
        configurable: true
    });
    return ModelValidationResult;
}());
exports.ModelValidationResult = ModelValidationResult;
