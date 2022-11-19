export class ConflictError extends Error {
  public readonly statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
