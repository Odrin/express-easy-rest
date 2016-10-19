import {ApplicationError} from "./application-error";
import {IPropertyValidationResult} from "../api/validation/property-validation-result";

export class ModelValidationError extends ApplicationError {
  constructor(public errors: Array<IPropertyValidationResult>) {
    super(`Model validation error: ${JSON.stringify(errors)}`);
  }
}
