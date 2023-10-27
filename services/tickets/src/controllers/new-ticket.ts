import { Request, Response } from "express";

import { TicketCreatedPublisher } from "../events/publishers/ticket-created";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

export async function newTicketController(req: Request, res: Response) {
  const { title, price } = req.body;

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id,
  });
  await ticket.save();

  // Emit ticket:created event
  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    version: ticket.version,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });

  res.status(201).send(ticket);
}
