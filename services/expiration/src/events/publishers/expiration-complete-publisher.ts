import { ExpirationCompleteEvent, Publisher, Subjects } from "@forksofpower/ticketbooth-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
