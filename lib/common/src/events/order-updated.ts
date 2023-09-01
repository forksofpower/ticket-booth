import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";
import { OrderStatus } from "./types";

import type { DomainEvent } from "./types/domain-event";

/**
 * Event
 */
export interface OrderUpdatedEventData {
  id: string;
  ticketId: string;
  expiresAt: Date;
  status: OrderStatus;
  userId: string;
}

export type OrderUpdatedEvent = DomainEvent<
  Subjects.OrderUpdated,
  OrderUpdatedEventData
>;

/**
 * Publisher
 */
export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  readonly subject = Subjects.OrderUpdated;
}

/**
 * Listener
 */
export class OrderUpdatedListener extends Listener<OrderUpdatedEvent> {
  readonly subject = Subjects.OrderUpdated;
  queueGroupName = "payments-service";

  onMessage(data: OrderUpdatedEventData, msg: Message): void {
    console.log("Event Data:", {
      id: data.id,
      title: data.ticketId,
      expiresAt: data.expiresAt,
      status: data.status,
      userId: data.userId,
    });

    // successful message
    msg.ack();
  }
}
