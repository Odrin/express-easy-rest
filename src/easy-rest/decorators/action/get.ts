import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {action} from "./action";

export function get(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'get',
    path
  };

  return action(options);
}
