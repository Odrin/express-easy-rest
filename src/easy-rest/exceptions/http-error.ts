import {ApplicationError} from "./application-error";

export class HttpError extends ApplicationError {
  constructor(protected status: number, public message?: string) {
    super(message);
  }

  getStatus(): number {
    return this.status;
  }

  getMessage(): string | any {
    return this.message;
  }
}
