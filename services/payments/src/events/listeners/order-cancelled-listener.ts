import { Message } from "node-nats-streaming";

import {
    Listener, OrderCancelledEvent, OrderCancelledEventData, OrderStatus, Subjects
} from "@forksofpower/ticketbooth-common";

import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCancelledEventData, msg: Message) {
    const order = await Order.findById(data.id);

    if (!order) throw new Error("Order not found");

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    msg.ack();
  }
}
