import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";
import { DomainEvent, OrderStatus } from "./types";

/**
 * Event
 */
export interface OrderCancelledEventData {
  id: string;
  ticket: {
    id: string;
  };
}

export type OrderCancelledEvent = DomainEvent<
  Subjects.OrderCancelled,
  OrderCancelledEventData
>;

/**
 * Publisher
 */
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

/**
 * Listener
 */
export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "payments-service";

  onMessage(data: OrderCancelledEventData, msg: Message): void {
    console.log("Event Data:", data);

    // successful message
    msg.ack();
  }
}
