import { DomainEvent, Subjects } from "./types";

export interface ExpirationCompleteEventData {
  orderId: string;
}

export type ExpirationCompleteEvent = DomainEvent<
  Subjects.ExpirationComplete,
  ExpirationCompleteEventData
>;
