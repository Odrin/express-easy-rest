export abstract class ApplicationError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
