import { Message } from "node-nats-streaming";

import { Listener, OrderCancelledEvent, Subjects } from "@forksofpower/ticketbooth-common";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "expiration-service";

  onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log("OrderCancelled Event data!", data);
    msg.ack();
  }
}
