import { Message } from "node-nats-streaming";

import {
    Listener, OrderCreatedEvent, OrderCreatedEventData, Subjects
} from "@forksofpower/ticketbooth-common";

import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCreatedEventData, msg: Message) {
    // Find the ticket that the order is reserving
    const order = Order.build({
      id: data.id,
      status: data.status,
      userId: data.userId,
      price: data.ticket.price,
      version: data.version,
    });
    await order.save();

    // ack the message
    msg.ack();
  }
}
