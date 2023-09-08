import { DomainEvent, Subjects } from "./types";

export interface PaymentCreatedEventData {
  orderId: string;
  id: string;
}

export type PaymentCreatedEvent = DomainEvent<
  Subjects.PaymentCreated,
  PaymentCreatedEventData
>;
