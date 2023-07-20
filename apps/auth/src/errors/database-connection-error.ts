export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();

    // Required to extend a build-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
