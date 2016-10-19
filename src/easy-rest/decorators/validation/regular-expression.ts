import {decoratorFactory} from "./decorator-factory";

export function RegularExpression(regExp: RegExp): PropertyDecorator {
  if (!regExp) {
    throw new Error(`Decorator config error; regExp: ${regExp}`);
  }

  return decoratorFactory((value: any) => {
    let valid = typeof (value) === 'string' && regExp.test(value);

    return {
      valid,
      error: !valid ? 'Input value does not match the specific regular expression' : undefined
    }
  });
}
