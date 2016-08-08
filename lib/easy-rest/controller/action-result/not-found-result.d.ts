import { Promise } from "es6-promise";
import { IActionResult } from "./action-result";
import { ResponseMessage } from "./response-message";
export declare class NotFoundResult<T> implements IActionResult {
    data: T;
    constructor(data?: T);
    executeAsync(): Promise<ResponseMessage>;
}
