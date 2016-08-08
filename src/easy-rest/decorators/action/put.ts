import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {action} from "./action";

export function put(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'put',
    path
  };

  return action(options);
}
