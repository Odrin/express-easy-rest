export class HttpError extends Error {
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
