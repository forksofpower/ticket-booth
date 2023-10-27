import { Request, Response } from "express";
import { MongooseError } from "mongoose";

import { User, UserModelErrors } from "@/models/user";
import { Password } from "@/services/password";
import { BadRequestError } from "@forksofpower/ticketbooth-common";

export async function changePasswordController(req: Request, res: Response) {
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
