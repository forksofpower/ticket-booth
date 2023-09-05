import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@forksofpower/ticketbooth-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
