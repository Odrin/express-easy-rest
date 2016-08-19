import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {Action} from "./action";

export function Post(path?: string): MethodDecorator {
  let options: IActionOptions = {
    method: 'post',
    path
  };

  return Action(options);
}
