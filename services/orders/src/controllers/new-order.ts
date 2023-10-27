import { Request, Response } from "express";

import { OrderCreatedPublisher } from "@/events/publishers/order-created";
import { Order, OrderStatus } from "@/models/order";
import { Ticket } from "@/models/ticket";
import { natsWrapper } from "@/nats-wrapper";
import {
  BadRequestError,
  NotFoundError,
} from "@forksofpower/ticketbooth-common";

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

export async function newOrderController(req: Request, res: Response) {
  const { ticketId } = req.body;
  // if (!ticketId) throw new NotFoundError();
  // find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId as string);
  if (!ticket) {
    throw new NotFoundError();
  }
  // Make sure that this ticket is not already reserved
  if (await ticket.isReserved()) {
    throw new BadRequestError("Ticket is already reserved");
  }

  // Calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  // Build the order and save it to the database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  });

  await order.save();
  await Order.populate(order, { path: "ticket" });

  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order._id,
    status: order.status,
    userId: order.userId,
    version: order.version,
    expiresAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  });

  res.status(201).send(order);
}
