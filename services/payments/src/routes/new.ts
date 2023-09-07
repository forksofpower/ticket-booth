import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
    BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").notEmpty().withMessage("Token must be provided"),
    body("orderId")
      .notEmpty()
      .isMongoId()
      .withMessage("Order ID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for a cancelled order");
    }

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
