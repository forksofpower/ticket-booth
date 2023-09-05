import { Subjects } from "./types/subjects";

import type { DomainEvent, Versionable } from "./types";

export interface TicketUpdatedEventData extends Versionable {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export type TicketUpdatedEvent = DomainEvent<
  Subjects.TicketUpdated,
  TicketUpdatedEventData
>;
