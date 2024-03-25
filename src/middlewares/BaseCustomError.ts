export class BaseCustomError extends Error {
    statusCode: number;
    constructor(message: string | undefined, statusCode: number) {
      super(message); // Ensure message is initialized, even if it's undefined
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }