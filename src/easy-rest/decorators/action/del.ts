import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {action} from "./action";

export function del(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'delete',
    path
  };

  return action(options);
}
