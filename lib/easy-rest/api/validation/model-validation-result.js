"use strict";
class ModelValidationResult {
    constructor(results) {
        this.results = results || [];
    }
    add(propertyKey, validationResult) {
        this.results.push({
            propertyKey,
            validationResult
        });
    }
    get valid() {
        for (let item of this.results) {
            if (!item.validationResult.valid) {
                return false;
            }
        }
        return true;
    }
    get errors() {
        return this.results.filter((item) => !item.validationResult.valid);
    }
}
exports.ModelValidationResult = ModelValidationResult;
