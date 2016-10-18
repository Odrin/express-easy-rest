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
var model_validator_1 = require("../../easy-rest/api/model-validator");
var required_1 = require("../../easy-rest/decorators/validation/required");
var string_length_1 = require("../../easy-rest/decorators/validation/string-length");
var EmptyModel = (function () {
    function EmptyModel() {
    }
    return EmptyModel;
}());
var ValidateModel = (function () {
    function ValidateModel() {
    }
    __decorate([
        required_1.Required(), 
        __metadata('design:type', String)
    ], ValidateModel.prototype, "required", void 0);
    __decorate([
        string_length_1.StringLength(5), 
        __metadata('design:type', String)
    ], ValidateModel.prototype, "string", void 0);
    return ValidateModel;
}());
describe('ModelValidator spec', function () {
    var validator;
    beforeEach(function () { return validator = new model_validator_1.ModelValidator(); });
    describe('canValidate method', function () {
        it('should return false if no validators metadata', function () {
            var canValidate = validator.canValidate(EmptyModel);
            expect(canValidate).toBeFalsy();
        });
        it('should return true if has validators metadata', function () {
            var canValidate = validator.canValidate(ValidateModel);
            expect(canValidate).toBeTruthy();
        });
    });
    describe('isValid method', function () {
        it('should return false if model is not valid', function () {
            var model = new ValidateModel();
            model.string = '123456';
            var isValid = validator.isValid(model, ValidateModel);
            expect(isValid).toBeFalsy();
        });
        it('should return true if model is valid', function () {
            var model = new ValidateModel();
            model.required = 'required';
            model.string = '12345';
            var isValid = validator.isValid(model, ValidateModel);
            expect(isValid).toBeTruthy();
        });
    });
});
