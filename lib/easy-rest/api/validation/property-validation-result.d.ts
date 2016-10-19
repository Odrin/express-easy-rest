import { IValidationResult } from "./validation-result";
export interface IPropertyValidationResult {
    propertyKey: string | symbol;
    validationResult: IValidationResult;
}
