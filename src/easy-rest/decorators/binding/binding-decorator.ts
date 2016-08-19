import {BindingType} from "./binding-type";
import {Metadata} from "../../metadata/metadata";
import {IParameterBindingOptions} from "./parameter-binding-options";
import {ACTION_BINDINGS_METADATA_KEY} from "../../metadata/metadata-keys";

export function bindingDecorator(bindingType: BindingType, propertyKey?: string): ParameterDecorator {
  return function (target: Object, targetKey: string, parameterIndex: number) {
    let paramTypes = Metadata.getParamTypes(target, targetKey);
    let dataType = paramTypes[parameterIndex];
    let binding: IParameterBindingOptions = {
      bindingType,
      parameterIndex,
      propertyKey,
      dataType
    };

    Metadata.append(ACTION_BINDINGS_METADATA_KEY, binding, target, targetKey);
  };
}
