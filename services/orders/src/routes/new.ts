import express, { Request, Response } from "express";
import { body } from "express-validator";

import {
    NotImplementedError, requireAuth, validateRequest
} from "@forksofpower/ticketbooth-common";

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
    res.send({});
  }
);

export { router as createOrderRouter };
