import { PaymentCreatedEvent, Publisher, Subjects } from "@forksofpower/ticketbooth-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
