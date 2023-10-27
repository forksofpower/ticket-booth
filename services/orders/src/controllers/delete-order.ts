import { Request, Response } from "express";

import { OrderCancelledPublisher } from "@/events/publishers/order-cancelled";
import { Order } from "@/models/order";
import { natsWrapper } from "@/nats-wrapper";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

export async function deleteOrderController(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) throw new BadRequestError("Order ID must be provided");

  const order = await Order.findById(id).populate("ticket");
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
}
