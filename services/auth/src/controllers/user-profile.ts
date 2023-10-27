import { Request, Response } from "express";

import { User } from "@/models/user";
import { BadRequestError } from "@forksofpower/ticketbooth-common";

export async function updateUserProfileController(req: Request, res: Response) {
  const {
    currentUser,
    body: { firstName, lastName },
  } = req;

  const user = await User.findById(currentUser?.id);
  if (!user) {
    throw new BadRequestError("update request failed");
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;

  await user.save();

  res.status(200).send(user);
}
