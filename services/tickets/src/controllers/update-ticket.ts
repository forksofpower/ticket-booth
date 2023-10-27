import { Request, Response } from "express";

import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "@forksofpower/ticketbooth-common";

import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

export async function updateTicketController(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) throw new BadRequestError("Order ID must be provided");

  const ticket = await Ticket.findById(id);
  if (!ticket) throw new NotFoundError();

  if (ticket.userId !== req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  if (ticket.orderId) {
    throw new BadRequestError("Cannot edit a reserved ticket");
  }

  ticket.set({ title: req.body.title, price: req.body.price });
  await ticket.save();

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    version: ticket.version,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });

  res.send(ticket);
}
