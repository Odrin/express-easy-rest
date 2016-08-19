import {BindingType} from "./binding-type";
import {bindingDecorator} from "./binding-decorator";

export function FromBody(propertyKey?: string): ParameterDecorator {
  return bindingDecorator(BindingType.body, propertyKey);
}
