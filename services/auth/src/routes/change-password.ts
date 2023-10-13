import express, { Request, Response } from "express";
import { body } from "express-validator";
import { MongooseError } from "mongoose";

import {
  BadRequestError,
  currentUser,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { User, UserModelErrors } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/change-password",
  [
    body("currentPassword")
      .isString()
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const { currentUser } = req;
    const user = await User.findOne({ email: currentUser?.email });

    if (!user) {
      throw new BadRequestError("signin request failed");
    }

    const currentPasswordMatch = await Password.compare(
      user.password,
      currentPassword
    );

    if (!currentPasswordMatch) {
      throw new BadRequestError("invalid credentials");
    }

    const newPasswordMatch = await Password.compare(user.password, newPassword);

    if (newPasswordMatch) {
      throw new BadRequestError(
        "new password cannot be the same as the old password"
      );
    }

    // User is authenticated, update password
    user.password = newPassword;

    try {
      await user.save();
      res.status(200).send({});
    } catch (error) {
      if (
        error instanceof MongooseError &&
        error.message.includes(UserModelErrors.PasswordUsedBefore)
      ) {
        throw new BadRequestError("Password has been used before");
      }

      throw new BadRequestError("Password update failed");
    }
  }
);

export { router as changePasswordRouter };
