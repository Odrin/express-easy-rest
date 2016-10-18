export abstract class ApplicationError extends Error {
  constructor(public message?: string) {
    super(message);
  }
}
