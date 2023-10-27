import { Request, Response } from "express";

import { Order, OrderStatus } from "@/models/order";

export async function listOrdersController(req: Request, res: Response) {
  const orders = await Order.find({
    userId: req.currentUser!.id,
    status: { $ne: OrderStatus.Cancelled },
  }).populate("ticket");

  res.send(orders);
}
