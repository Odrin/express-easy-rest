import {Metadata} from "../../metadata/metadata";
import {VALIDATION_VALIDATORS_KEY} from "../../metadata/metadata-keys";
import {IPropertyValidator} from "./property-validator";
import {ModelValidationResult} from "./model-validation-result";

export class ModelValidator {
  canValidate(dataType: any): boolean {
    return Metadata.has(VALIDATION_VALIDATORS_KEY, dataType);
  }

  validate(model: any, dataType: any): ModelValidationResult {
    let validators = Metadata.get<IPropertyValidator[]>(VALIDATION_VALIDATORS_KEY, dataType);
    let modelValidationResult = new ModelValidationResult();

    for (let i = 0; i < validators.length; i++) {
      let validator = validators[i];
      let validationResult = validator.validate(model[validator.propertyKey]);

      modelValidationResult.add(validator.propertyKey, validationResult);
    }

    return modelValidationResult;
  }
}
