import {Promise} from "es6-promise";
import {ResponseMessage} from "./response-message";

export interface IActionResult {
  executeAsync(): Promise<ResponseMessage>;
}
