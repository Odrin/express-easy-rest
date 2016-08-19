import {BindingType} from "./binding-type";
import {bindingDecorator} from "./binding-decorator";

export function FromRoute(propertyKey?: string): ParameterDecorator {
  return bindingDecorator(BindingType.route, propertyKey);
}
