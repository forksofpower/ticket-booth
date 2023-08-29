import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, config.jwtSecret);
    req.currentUser = payload as UserPayload;
  } catch (error) {}

  next();
};
