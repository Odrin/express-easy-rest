import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {Action} from "./action";

export function Put(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'put',
    path
  };

  return Action(options);
}
