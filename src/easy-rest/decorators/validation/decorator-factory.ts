import {VALIDATION_VALIDATORS_KEY} from "../../metadata/metadata-keys";
import {IPropertyValidator} from "../../api/validation/property-validator";
import {Metadata} from "../../metadata/metadata";
import {IValidationResult} from "../../api/validation/validation-result";

export function decoratorFactory(validate: (value: any) => IValidationResult): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Metadata.append<IPropertyValidator>(VALIDATION_VALIDATORS_KEY, {propertyKey, validate}, target.constructor);
  };
}
