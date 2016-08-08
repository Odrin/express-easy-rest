import "reflect-metadata";
import {IControllerOptions} from "./controller-options";
import {CONTROLLER_OPTIONS_METADATA_KEY} from "../metadata-keys";

export function controller(options: IControllerOptions): ClassDecorator {
  return function (target: Function) {
    if (Reflect.hasMetadata(CONTROLLER_OPTIONS_METADATA_KEY, target)) {
      throw new Error(`Duplicate ApiController decorator on "${(<any>target)['name']}"`);
    }

    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA_KEY, options, target);
  };
}
