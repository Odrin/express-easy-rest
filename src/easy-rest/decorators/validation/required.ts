import {decoratorFactory} from "./decorator-factory";

export function Required(): PropertyDecorator {
  return decoratorFactory((value: any) => {
    let valid = !!value;

    return {
      valid,
      error: !valid ? 'Property is required' : undefined
    };
  });
}
