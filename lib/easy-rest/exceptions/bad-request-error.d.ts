import { HttpError } from "./http-error";
export declare class BadRequestError extends HttpError {
    constructor(message?: string);
}
