import { ModelValidationResult } from "./model-validation-result";
export declare class ModelValidator {
    canValidate(dataType: any): boolean;
    validate(model: any, dataType: any): ModelValidationResult;
}
