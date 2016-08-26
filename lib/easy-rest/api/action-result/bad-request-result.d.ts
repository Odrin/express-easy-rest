import { IActionResult } from "./action-result";
import { ResponseMessage } from "./response-message";
export declare class BadRequestResult<T> implements IActionResult {
    data: T;
    constructor(data?: T);
    executeAsync(): Promise<ResponseMessage>;
}
