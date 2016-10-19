import { ApplicationError } from "./application-error";
export declare class HttpError extends ApplicationError {
    protected status: number;
    constructor(status: number, message?: string);
    getStatus(): number;
    getMessage(): string | any;
}
