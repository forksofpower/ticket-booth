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
  return async function (req: Request, res: Response, next: NextFunction) {
    const {
      idParamName = "id",
      rootKey = "context",
      key = schema.modelName.toLowerCase(),
    } = options;

    if (!req.params[idParamName]) {
      throw new BadRequestError(`Param ${idParamName} is required`);
    }

    const document = await schema.findById(req.params[idParamName]);

    if (!document) {
      throw new NotFoundError();
    }

    // set the document on the request object using the label as the key
    (req as any)[rootKey][key] = document;

    next();
  };
}
