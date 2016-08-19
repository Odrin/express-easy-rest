import {IControllerOptions} from "./controller-options";
import {CONTROLLER_OPTIONS_METADATA_KEY} from "../../metadata/metadata-keys";
import {Metadata} from "../../metadata/metadata";

export function Controller(options: IControllerOptions): ClassDecorator {
  return function (target: Function) {
    if (Metadata.has(CONTROLLER_OPTIONS_METADATA_KEY, target)) {
      throw new Error(`Duplicate ApiController decorator on "${(<any>target)['name']}"`);
    }

    Metadata.define(CONTROLLER_OPTIONS_METADATA_KEY, options, target);
  };
}
