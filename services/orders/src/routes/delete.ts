import express, { Request, Response } from "express";

import {
  NotAuthorizedError,
  NotFoundError,
  OrderCancelledPublisher,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete("/api/orders/:id", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();

  // publish an event saying this was cancelled!
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id,
    },
  });

  return res.status(204).send(order);
});

export { router as deleteOrderRouter };
