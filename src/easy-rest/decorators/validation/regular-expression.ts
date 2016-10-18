import {decoratorFactory} from "./decorator-factory";

export function RegularExpression(regExp: RegExp): PropertyDecorator {
  if (!regExp) {
    throw new Error(`Decorator config error; regExp: ${regExp}`);
  }

  return decoratorFactory((value: any) => typeof (value) === 'string' && regExp.test(value));
}
