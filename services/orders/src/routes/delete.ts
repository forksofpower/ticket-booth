import express, { Request, Response } from "express";

import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

import { OrderCancelledPublisher } from "../events/publishers/order-cancelled";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete("/api/orders/:id", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate("ticket");
  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();

  // publish an event saying this was cancelled!
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  return res.status(204).send(order);
});

export { router as deleteOrderRouter };
