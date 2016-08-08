import {Promise} from "es6-promise";
import {IActionResult} from "./action-result";
import {ResponseMessage} from "./response-message";

export class ErrorResult<T> implements IActionResult {
  constructor(public data?: T) {
  }

  executeAsync(): Promise<ResponseMessage> {
    let message = new ResponseMessage(this.data, 500);

    return Promise.resolve(message);
  }
}
