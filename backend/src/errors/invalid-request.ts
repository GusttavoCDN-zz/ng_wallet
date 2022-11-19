export class InvalidRequestError extends Error {
  public readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidRequestError';
  }
}
