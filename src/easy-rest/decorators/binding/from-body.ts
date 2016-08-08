import {IParameterBindingOptions} from "./parameter-binding-options";
import {ACTION_BINDINGS_METADATA_KEY} from "../metadata-keys";
import {BindingType} from "./binding-type";

export function fromBody(propertyKey?: string): ParameterDecorator {
  return function (target: Object, targetKey: string, parameterIndex: number) {
    let bindings: IParameterBindingOptions[] = Reflect.getMetadata(ACTION_BINDINGS_METADATA_KEY, target, targetKey) || [];
    let paramTypes = Reflect.getMetadata('design:paramtypes', target, targetKey);
    let dataType = paramTypes[parameterIndex];

    bindings.push({
      bindingType: BindingType.body,
      parameterIndex,
      propertyKey,
      dataType
    });

    Reflect.defineMetadata(ACTION_BINDINGS_METADATA_KEY, bindings, target, targetKey);
  };
}
