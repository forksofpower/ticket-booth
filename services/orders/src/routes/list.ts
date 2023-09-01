import express, { Request, Response } from "express";

import { OrderStatus, requireAuth } from "@forksofpower/ticketbooth-common";

import { Order } from "../models/order";

const router = express.Router();
router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
    status: { $ne: OrderStatus.Cancelled },
  }).populate("ticket");

  res.send(orders);
});

export { router as listOrderRouter };
