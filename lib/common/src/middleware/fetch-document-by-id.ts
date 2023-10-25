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

    console.log("context", request[rootKey]);
    schema
      .findById(id)
      .then((doc) => {
        if (!doc) throw new NotFoundError();
        console.log("document", doc);
        // set the document on the request object using the label as the key
        request[rootKey][key] = doc;
        console.log("request", request);
      })
      .catch((reason) => {
        throw new NotFoundError();
      });

    next();
  };
}
