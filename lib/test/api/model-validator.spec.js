"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
const model_validator_1 = require("../../easy-rest/api/validation/model-validator");
const required_1 = require("../../easy-rest/decorators/validation/required");
const string_length_1 = require("../../easy-rest/decorators/validation/string-length");
class EmptyModel {
}
class ValidateModel {
}
__decorate([
    required_1.Required(), 
    __metadata('design:type', String)
], ValidateModel.prototype, "required", void 0);
__decorate([
    string_length_1.StringLength(5), 
    __metadata('design:type', String)
], ValidateModel.prototype, "string", void 0);
describe('ModelValidator spec', () => {
    let validator;
    beforeEach(() => validator = new model_validator_1.ModelValidator());
    describe('canValidate method', () => {
        it('should return false if no validators metadata', () => {
            let canValidate = validator.canValidate(EmptyModel);
            expect(canValidate).toBeFalsy();
        });
        it('should return true if has validators metadata', () => {
            let canValidate = validator.canValidate(ValidateModel);
            expect(canValidate).toBeTruthy();
        });
    });
    describe('validate method', () => {
        it('should return false if model is not valid', () => {
            let model = new ValidateModel();
            model.string = '123456';
            let result = validator.validate(model, ValidateModel);
            expect(result.valid).toBeFalsy();
        });
        it('should return true if model is valid', () => {
            let model = new ValidateModel();
            model.required = 'required';
            model.string = '12345';
            let result = validator.validate(model, ValidateModel);
            expect(result.valid).toBeTruthy();
        });
    });
});
