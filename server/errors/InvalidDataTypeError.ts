export class InvalidDataTypeError extends Error {
  constructor(public message: string, ...params: any[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidDataTypeError);
    }

    this.name = 'InvalidDataTypeError';
    this.message = message;
  }
}
