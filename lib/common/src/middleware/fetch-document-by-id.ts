import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model as MongooseModel } from "mongoose";

import { BadRequestError, NotFoundError } from "../errors";

/**
 * Fetches a MongoDB document by ID and attaches it to the request object
 * @param schema The Mongoose model to use for fetching the document.
 * @param options Options for configuring the middleware.
 */
export function fetchDocumentById(
  schema: typeof MongooseModel,
  options: {
    key?: string;
    rootKey?: string;
    idParamName?: string;
  } = {}
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const request = req as any;
    const {
      idParamName = "id",
      rootKey = "context",
      key = schema.modelName.toLowerCase(),
    } = options;

    const id = req.params[idParamName];
    if (!id) {
      throw new BadRequestError(`Param ${idParamName} is required`);
    }

    request[rootKey] ||= {};

    try {
      schema.findById(id).then((doc) => {
        if (!doc) {
          // use next() to pass the error to the error handler
          next(new NotFoundError());
        }
        // set the document on the request object
        request[rootKey][key] = doc;
        next();
      });
    } catch (error) {
      throw new NotFoundError();
    }
  };
}
