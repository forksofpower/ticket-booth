import express, { Request, Response } from "express";
import { param } from "express-validator";

import {
  fetchDocumentById,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";

const router = express.Router();
router.get(
  "/api/orders/:id",
  requireAuth,
  [
    param("id")
      .notEmpty()
      .isMongoId()
      .withMessage("correctly formatted Ticket ID must be provided"),
  ],
  validateRequest,
  fetchDocumentById(Order),
  async (req: Request, res: Response) => {
    const order = await req.context.order!.populate("ticket");

    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    res.send(order);
  }
);

export { router as showOrderRouter };
