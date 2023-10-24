import express, { Request, Response } from "express";
import { param } from "express-validator";

import {
  fetchDocumentById,
  NotAuthorizedError,
  OrderStatus,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { OrderCancelledPublisher } from "../events/publishers/order-cancelled";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  param("id").isMongoId().withMessage("Order ID must be valid"),
  validateRequest,
  fetchDocumentById(Order),
  async (req: Request, res: Response) => {
    const order = req.order!;
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
);

export { router as deleteOrderRouter };
