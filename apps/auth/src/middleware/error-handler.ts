import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError, RequestValidationError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("handling error: RequestValidationError");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("handling error: DatabaseConnectionError");
  }

  res.status(400).send({
    message: err.message,
  });
};
