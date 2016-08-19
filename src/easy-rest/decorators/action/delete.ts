import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {Action} from "./action";

export function Delete(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'delete',
    path
  };

  return Action(options);
}
