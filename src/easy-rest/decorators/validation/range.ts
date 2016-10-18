import {decoratorFactory} from "./decorator-factory";

export function Range(minimum: number, maximum: number): PropertyDecorator {
  return decoratorFactory((value: any) => typeof (value) === 'number' && value >= minimum && value <= maximum);
}
