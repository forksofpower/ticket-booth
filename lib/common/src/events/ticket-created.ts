import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";

import type { DomainEvent } from "./types";

/**
 * Event
 */
export interface TicketCreatedEventData {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export type TicketCreatedEvent = DomainEvent<
  Subjects.TicketCreated,
  TicketCreatedEventData
>;

/**
 * Publisher
 */
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

/**
 * Listener
 */
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEventData, msg: Message): void {
    console.log("Event Data:", {
      id: data.id,
      title: data.title,
      price: data.price,
    });

    // successful message
    msg.ack();
  }
}
