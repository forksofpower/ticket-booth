import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
    BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";
import { Ticket } from "../models/ticket";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// import {
//     OrderCreatedPublisher, requireAuth, validateRequest
// } from "@forksofpower/ticketbooth-common";
// import { Order } from "../models/order";

// import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .notEmpty()
      .isMongoId()
      .withMessage("Ticket ID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
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

    // TODO: Publish an event saying that an order was created

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
