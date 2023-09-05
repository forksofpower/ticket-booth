import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
// import { OrderCreatedEvent, OrderUpdatedEventData } from "./order-updated";
import { Subjects } from "./subjects";
import { DomainEvent, OrderStatus } from "./types";

/**
 * Event
 */
export interface OrderCreatedEventData {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: string;
  ticket: {
    id: string;
    price: number;
  };
}

export type OrderCreatedEvent = DomainEvent<
  Subjects.OrderCreated,
  OrderCreatedEventData
>;

/**
 * Publisher
 */
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

/**
 * Listener
 */
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "payments-service";

  onMessage(data: OrderCreatedEventData, msg: Message): void {
    console.log("Event Data:", data);

    // successful message
    msg.ack();
  }
}
