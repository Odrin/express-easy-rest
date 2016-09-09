import {HttpError} from "./api-error";

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(401, message);
  }
}
