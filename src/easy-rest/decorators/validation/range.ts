import {decoratorFactory} from "./decorator-factory";

export function Range(minimum: number, maximum: number): PropertyDecorator {
  return decoratorFactory((value: any) => {
    let valid = typeof (value) === 'number' && value >= minimum && value <= maximum;

    return {
      valid,
      error: !valid ? 'Input number out of range' : undefined
    };
  });
}
