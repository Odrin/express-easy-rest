import { IValidationResult } from "./validation-result";
export interface IPropertyValidator {
    propertyKey: string | symbol;
    validate(value: any): IValidationResult;
}
