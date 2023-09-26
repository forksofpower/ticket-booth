import { Message } from "node-nats-streaming";

import {
  Listener,
  OrderCreatedEvent,
  OrderCreatedEventData,
  Subjects,
} from "@forksofpower/ticketbooth-common";

import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "expiration-service";

  async onMessage(data: OrderCreatedEventData, msg: Message) {
    console.log("OrderCreated Event data!", data);
    const { id, expiresAt } = data;
    const delay = new Date(expiresAt).getTime() - new Date().getTime();
    console.log(
      `Waiting ${Math.floor(delay / 1000 / 60)} minutes ${
        Math.floor(delay / 1000) % 60
      } seconds to process expiration for order ${id}`
    );
    await expirationQueue.add({ orderId: id }, { delay });

    msg.ack();
  }
}
