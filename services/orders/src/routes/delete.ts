import express, { Request, Response } from "express";

import {
    NotAuthorizedError, NotFoundError, NotImplementedError
} from "@forksofpower/ticketbooth-common";

// import { body } from "express-validator";
// import {
//     NotAuthorizedError, NotFoundError, OrderUpdatedPublisher, requireAuth, validateRequest
// } from "@forksofpower/ticketbooth-common";
import { Order } from "../models/order";

// import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.delete("/api/orders/:id", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = "cancelled";
  await order.save();

  throw new NotImplementedError();
});

export { router as deleteOrderRouter };
