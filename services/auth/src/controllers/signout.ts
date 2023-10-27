import { Request, Response } from "express";

export async function signoutController(req: Request, res: Response) {
  req.session = null;
  res.send({});
}
