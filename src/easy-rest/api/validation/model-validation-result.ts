import {IValidationResult} from "./validation-result";
import {IPropertyValidationResult} from "./property-validation-result";

export class ModelValidationResult {
  private results: Array<IPropertyValidationResult>;

  constructor(results?: Array<IPropertyValidationResult>) {
    this.results = results || [];
  }

  add(propertyKey: string | symbol, validationResult: IValidationResult): void {
    this.results.push({
      propertyKey,
      validationResult
    });
  }

  get valid(): boolean {
    for (let item of this.results) {
      if (!item.validationResult.valid) {
        return false;
      }
    }

    return true;
  }

  get errors(): Array<IPropertyValidationResult> {
    return this.results.filter((item) => !item.validationResult.valid);
  }
}
