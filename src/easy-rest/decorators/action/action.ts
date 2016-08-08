import "reflect-metadata";
import {IActionOptions} from "./action-options";
import {ACTION_OPTIONS_METADATA_KEY, ACTION_DECLARATION_METADATA_KEY} from "../metadata-keys";

export function action(options: IActionOptions): MethodDecorator {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    if (Reflect.hasMetadata(ACTION_OPTIONS_METADATA_KEY, target, propertyKey)) {
      throw new Error(`Duplicate ApiAction decorator on "${propertyKey}"`);
    }

    let methods: string[] = Reflect.getMetadata(ACTION_DECLARATION_METADATA_KEY, target) || [];

    methods.push(propertyKey);

    Reflect.defineMetadata(ACTION_DECLARATION_METADATA_KEY, methods, target);
    Reflect.defineMetadata(ACTION_OPTIONS_METADATA_KEY, options, target, propertyKey);
  };
}
