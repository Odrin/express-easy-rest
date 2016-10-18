import { ApplicationError } from "./application-error";
export declare class ModelValidationError extends ApplicationError {
    key: string;
    constructor(key: string, value: any);
}
