import { NextFunction, Request, Response } from "express";
import { Model as MongooseModel } from "mongoose";

import { BadRequestError, NotFoundError } from "../errors";

export function fetchDocumentById(
  schema: typeof MongooseModel,
  label?: string,
  idParamName?: string
) {
  return async function (req: Request, _res: Response, next: NextFunction) {
    idParamName ||= "id";
    label ||= schema.modelName.toLowerCase();

    if (!req.params[idParamName]) {
      throw new BadRequestError(`Param ${idParamName} is required`);
    }

    const document = await schema.findById(req.params[idParamName]);
    if (!document) {
      throw new NotFoundError();
    }
    req.documents = { [label]: document };

    next();
  };
}
