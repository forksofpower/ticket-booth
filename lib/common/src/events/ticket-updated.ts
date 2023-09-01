import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";

import type { DomainEvent } from "./types";

/**
 * Event
 */
export interface TicketUpdatedEventData {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export type TicketUpdatedEvent = DomainEvent<
  Subjects.TicketUpdated,
  TicketUpdatedEventData
>;

/**
 * Publisher
 */
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

/**
 * Listener
 */
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = "payments-service";

  onMessage(data: TicketUpdatedEventData, msg: Message): void {
    console.log("Event Data:", {
      id: data.id,
      title: data.title,
      price: data.price,
    });

    // successful message
    msg.ack();
  }
}
