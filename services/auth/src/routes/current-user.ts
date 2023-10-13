import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
  BadRequestError,
  currentUser,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

// update the user's "profile" information
router.patch(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  [
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").optional().isString(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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
);

export { router as currentUserRouter };
