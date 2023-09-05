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
