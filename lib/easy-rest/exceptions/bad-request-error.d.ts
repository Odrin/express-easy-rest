import { HttpError } from "./api-error";
export declare class BadRequestError extends HttpError {
    constructor(message?: string);
}
