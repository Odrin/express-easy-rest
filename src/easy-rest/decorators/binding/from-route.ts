import {BindingType} from "./binding-type";
import {bindingDecorator} from "./binding-decorator";

export function fromRoute(propertyKey?: string): ParameterDecorator {
  return bindingDecorator(BindingType.route, propertyKey);
}
