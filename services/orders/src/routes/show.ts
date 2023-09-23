import express, { Request, Response } from "express";
import { param } from "express-validator";

import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";

const router = express.Router();
router.get(
  "/api/orders/:id",
  requireAuth,
  [
    param("id")
      .notEmpty()
      .isMongoId()
      .withMessage("correctly formatted Ticket ID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    res.send(order);
  }
);

export { router as showOrderRouter };
