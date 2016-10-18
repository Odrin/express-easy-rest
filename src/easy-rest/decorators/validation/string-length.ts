import {decoratorFactory} from "./decorator-factory";

export function StringLength(maxLength: number, minLength?: number): PropertyDecorator {
  if (maxLength <= 0 || minLength && minLength < 0 || minLength && minLength > maxLength) {
    throw new Error(`Decorator config error; maxLength: ${maxLength}, minLength: ${minLength}`);
  }

  return decoratorFactory((value: any) => {
    if (typeof value !== 'string') {
      return false;
    }

    if (!!minLength && (!value || (<string>value).length < minLength )) {
      return false;
    }

    if (value && (<string>value).length > maxLength) {
      return false;
    }

    return true;
  });
}
