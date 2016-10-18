import {ApplicationError} from "./application-error";

export class ModelValidationError extends ApplicationError {
  constructor(public key: string, value: any) {
    super(`Model validation error: ${key}:${JSON.stringify(value)}`);
  }
}
