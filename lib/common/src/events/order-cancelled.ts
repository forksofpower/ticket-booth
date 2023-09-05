import { Subjects } from "./subjects";
import { DomainEvent } from "./types";

export interface OrderCancelledEventData {
  id: string;
  ticket: {
    id: string;
  };
}

export type OrderCancelledEvent = DomainEvent<
  Subjects.OrderCancelled,
  OrderCancelledEventData
>;
