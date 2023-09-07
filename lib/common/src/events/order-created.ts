import { DomainEvent, OrderStatus, Subjects, Versionable } from "./types";

export interface OrderCreatedEventData {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: string;
  version: number;
  ticket: {
    id: string;
    price: number;
  };
}

export type OrderCreatedEvent = DomainEvent<
  Subjects.OrderCreated,
  OrderCreatedEventData
>;
