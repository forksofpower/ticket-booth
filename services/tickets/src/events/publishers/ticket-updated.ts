import {
  Publisher,
  TicketUpdatedEvent,
} from "@forksofpower/ticketbooth-common";
import { Subjects } from "@forksofpower/ticketbooth-common/build/events/subjects";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
