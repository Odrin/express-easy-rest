import {BindingType} from "./binding-type";
import {bindingDecorator} from "./binding-decorator";

export function fromBody(propertyKey?: string): ParameterDecorator {
  return bindingDecorator(BindingType.body, propertyKey);
}
