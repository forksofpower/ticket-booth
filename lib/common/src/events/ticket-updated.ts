import { Subjects } from "./subjects";

import type { DomainEvent } from "./types";

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
