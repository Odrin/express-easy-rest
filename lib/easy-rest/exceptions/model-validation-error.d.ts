import { ApplicationError } from "./application-error";
import { IPropertyValidationResult } from "../api/validation/property-validation-result";
export declare class ModelValidationError extends ApplicationError {
    errors: Array<IPropertyValidationResult>;
    constructor(errors: Array<IPropertyValidationResult>);
}
