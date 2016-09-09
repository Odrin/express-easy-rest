import { HttpError } from "./api-error";
export declare class UnauthorizedError extends HttpError {
    constructor(message?: string);
}
