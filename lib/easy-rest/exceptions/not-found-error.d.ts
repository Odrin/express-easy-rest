import { HttpError } from "./api-error";
export declare class NotFoundError extends HttpError {
    constructor(message?: string);
}
