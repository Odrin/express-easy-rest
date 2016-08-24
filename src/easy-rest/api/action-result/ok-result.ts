import {Promise} from "es6-promise";
import {IActionResult} from "./action-result";
import {ResponseMessage} from "./response-message";

export class OkResult<T> implements IActionResult {
  constructor(public data?: T) {
  }

  executeAsync(): Promise<ResponseMessage> {
    let message = new ResponseMessage(this.data);

    return Promise.resolve(message);
  }
}
