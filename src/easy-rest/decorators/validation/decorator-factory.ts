import {VALIDATION_VALIDATORS_KEY} from "../../metadata/metadata-keys";
import {IPropertyValidator} from "../../api/property-validator";
import {Metadata} from "../../metadata/metadata";

export function decoratorFactory(validate: (value: any) => boolean): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Metadata.append<IPropertyValidator>(VALIDATION_VALIDATORS_KEY, {propertyKey, validate}, target.constructor);
  };
}
