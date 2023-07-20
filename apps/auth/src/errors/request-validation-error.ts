import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(private errors: ValidationError[]) {
    super();

    // Required to extend a build-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
