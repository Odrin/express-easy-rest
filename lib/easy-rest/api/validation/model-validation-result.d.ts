import { IValidationResult } from "./validation-result";
import { IPropertyValidationResult } from "./property-validation-result";
export declare class ModelValidationResult {
    private results;
    constructor(results?: Array<IPropertyValidationResult>);
    add(propertyKey: string | symbol, validationResult: IValidationResult): void;
    readonly valid: boolean;
    readonly errors: Array<IPropertyValidationResult>;
}
