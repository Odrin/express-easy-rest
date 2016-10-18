import {Metadata} from "../metadata/metadata";
import {VALIDATION_VALIDATORS_KEY} from "../metadata/metadata-keys";
import {IPropertyValidator} from "./property-validator";

export class ModelValidator {
  canValidate(dataType: any): boolean {
    return Metadata.has(VALIDATION_VALIDATORS_KEY, dataType);
  }

  isValid(model: any, dataType: any): boolean {
    let validators = Metadata.get<IPropertyValidator[]>(VALIDATION_VALIDATORS_KEY, dataType);

    for (let validator of validators) {
      let propValid = validator.validate(model[validator.propertyKey]);

      if (!propValid) {
        return false;
      }
    }

    return true;
  }
}
