import { Message } from "node-nats-streaming";

import {
    ExpirationCompleteEvent, ExpirationCompleteEventData, Listener, OrderStatus, Subjects
} from "@forksofpower/ticketbooth-common";

import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = "orders-service";

  async onMessage(data: ExpirationCompleteEventData, msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
