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
    const order = await Order.findById(req.params.id).populate("ticket");
    if (!order) throw new NotFoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    console.log(JSON.stringify(order.toJSON(), null, 2));
    res.send(order);
  }
);

export { router as showOrderRouter };
