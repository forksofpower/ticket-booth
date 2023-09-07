import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
    BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { stripe } from "../stripe";

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
    const charge = await stripe.charges.create({
      currency: "usd",
      source: token,
      amount: order.price * 100,
      metadata: {
        orderId: order.id,
        userEmail: req.currentUser!.email,
      },
    });

    const stripeId = charge.id;

    if (!stripeId) {
      throw new BadRequestError("Payment Failed");
    }
    const payment = Payment.build({
      order,
      stripeId,
    });

    await payment.save();

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
