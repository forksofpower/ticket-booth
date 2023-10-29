import { Request, Response } from "express";

import { Order } from "@/models/order";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "@forksofpower/ticketbooth-common";

export async function showOrderController(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) throw new BadRequestError("Order ID must be provided");

  const order = await Order.findById(id).populate("ticket");
  if (!order) throw new NotFoundError();

  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();
  res.send(order);
}
