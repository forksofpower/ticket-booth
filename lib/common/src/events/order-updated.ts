import { Subjects } from "./subjects";
import { OrderStatus } from "./types";

import type { DomainEvent } from "./types/domain-event";

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
