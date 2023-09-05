import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";
import { DomainEvent } from "./types";

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
