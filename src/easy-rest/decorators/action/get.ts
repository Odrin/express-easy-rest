import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {Action} from "./action";

export function Get(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'get',
    path
  };

  return Action(options);
}
