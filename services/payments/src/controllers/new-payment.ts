import { Request, Response } from "express";
import stripe from "stripe";

import {
  PaymentCreatedPublisher,
} from "@/events/publishers/payment-created-publisher";
import { Order } from "@/models/order";
import { Payment } from "@/models/payment";
import { natsWrapper } from "@/nats-wrapper";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

export async function newPaymentController(req: Request, res: Response) {
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
  const charges = new stripe.ChargesResource();
  const charge = await charges.create({
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
  new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.order.id,
  });

  res.status(201).send({ id: payment.id });
}
