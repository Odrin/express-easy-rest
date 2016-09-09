import {HttpError} from "./api-error";

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(400, message);
  }
}
