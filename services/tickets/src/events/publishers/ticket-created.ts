import {
  Publisher,
  TicketCreatedEvent,
} from "@forksofpower/ticketbooth-common";
import { Subjects } from "@forksofpower/ticketbooth-common/build/events/subjects";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
