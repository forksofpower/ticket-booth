import { Subjects } from "./subjects";
import { DomainEvent, OrderStatus } from "./types";

export interface OrderCreatedEventData {
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
