import {decoratorFactory} from "./decorator-factory";

export function Required(): PropertyDecorator {
  return decoratorFactory((value: any) => !!value);
}
