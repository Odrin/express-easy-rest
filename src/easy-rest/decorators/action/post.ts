import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {action} from "./action";

export function post(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'post',
    path
  };

  return action(options);
}
