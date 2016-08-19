import {IActionOptions} from "./action-options";
import {ACTION_OPTIONS_METADATA_KEY, ACTION_DECLARATION_METADATA_KEY} from "../../metadata/metadata-keys";
import {Metadata} from "../../metadata/metadata";

export function Action(options: IActionOptions): MethodDecorator {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    if (Metadata.has(ACTION_OPTIONS_METADATA_KEY, target, propertyKey)) {
      throw new Error(`Duplicate ApiAction decorator on "${propertyKey}"`);
    }

    Metadata.append(ACTION_DECLARATION_METADATA_KEY, propertyKey, target);
    Metadata.define(ACTION_OPTIONS_METADATA_KEY, options, target, propertyKey);
  };
}
