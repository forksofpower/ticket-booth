import { DomainEvent, Subjects, Versionable } from "./types";

export interface TicketCreatedEventData extends Versionable {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export type TicketCreatedEvent = DomainEvent<
  Subjects.TicketCreated,
  TicketCreatedEventData
>;
