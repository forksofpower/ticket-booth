import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { config } from "../config";
import { RequestValidationError } from "../errors";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

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
);

export { router as signupRouter };
