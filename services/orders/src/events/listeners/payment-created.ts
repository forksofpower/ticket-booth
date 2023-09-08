import { Message } from "node-nats-streaming";

import {
    Listener, OrderStatus, PaymentCreatedEvent, PaymentCreatedEventData, Subjects
} from "@forksofpower/ticketbooth-common";

import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = "orders-service";

  async onMessage(data: PaymentCreatedEventData, msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();
    // TODO: emit OrderUpdated event
    msg.ack();
  }
}
