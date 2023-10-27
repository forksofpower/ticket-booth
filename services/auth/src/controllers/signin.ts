import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "@/config";
import { User } from "@/models/user";
import { Password } from "@/services/password";
import { BadRequestError } from "@forksofpower/ticketbooth-common";

export async function signinController(req: Request, res: Response) {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("signin request failed");
  }

  const match = await Password.compare(existingUser.password, password);

  if (!match) {
    throw new BadRequestError("invalid credentials");
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    config.jwtSecret
  );

  // store JWT on session
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
}
