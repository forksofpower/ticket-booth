import { Request, Response } from "express";

import {
  BadRequestError,
  NotFoundError,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../models/ticket";

export async function showTicketController(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) throw new BadRequestError("Order ID must be provided");

  const ticket = await Ticket.findById(id);
  if (!ticket) throw new NotFoundError();

  res.send(ticket);
}
