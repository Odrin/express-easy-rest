import {HttpError} from "./api-error";

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(404, message);
  }
}
