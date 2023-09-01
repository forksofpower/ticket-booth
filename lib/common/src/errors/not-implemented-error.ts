import { CustomError, SerializedError } from "./custom-error";

export class NotImplementedError extends CustomError {
  statusCode = 501;
  constructor() {
    super("endpoint not implemented");

    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.message }];
  }
}
