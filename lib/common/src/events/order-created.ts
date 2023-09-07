import { DomainEvent, OrderStatus, Subjects, Versionable } from "./types";

export interface OrderCreatedEventData extends Versionable {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: string;
  ticket: {
    id: string;
    price: number;
  };
}

export type OrderCreatedEvent = DomainEvent<
  Subjects.OrderCreated,
  OrderCreatedEventData
>;
