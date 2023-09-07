import { DomainEvent, OrderStatus, Subjects, Versionable } from "./types";

export interface OrderUpdatedEventData {
  id: string;
  ticketId: string;
  expiresAt: Date;
  version: number;
  status: OrderStatus;
  userId: string;
}

export type OrderUpdatedEvent = DomainEvent<
  Subjects.OrderUpdated,
  OrderUpdatedEventData
>;
