import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "@/config";
import { User } from "@/models/user";
import { RequestValidationError } from "@forksofpower/ticketbooth-common";

export async function signupController(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;

  // Prevent duplicate emails
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new RequestValidationError([
      {
        msg: "Email in use",
        type: "field",
        path: "email",
        location: "body",
        value: email,
      },
    ]);

  // Create User
  const user = User.build({
    email,
    password,
    firstName,
    lastName,
  });
  await user.save();

  // Generate JWT and store on session
  const userJwt = jwt.sign(
    {
      id: user!.id,
      email: user!.email,
    },
    config.jwtSecret
  );

  req.session = {
    jwt: userJwt,
  };

  // console.debug("User created", user!.id);
  res.status(201).send(user);
}
