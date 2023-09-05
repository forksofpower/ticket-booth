import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@forksofpower/ticketbooth-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
