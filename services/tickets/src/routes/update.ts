import express, { Request, Response } from "express";
import { body, param } from "express-validator";

import {
  BadRequestError,
  fetchDocumentById,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    param("id").isMongoId().withMessage("Ticket ID must be valid"),
    body("title").notEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  fetchDocumentById(Ticket),
  async (req: Request, res: Response) => {
    const ticket = req.context.ticket;

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
);

export { router as updateTicketRouter };
