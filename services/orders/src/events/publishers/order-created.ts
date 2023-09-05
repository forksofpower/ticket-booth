import { OrderCreatedEvent, Publisher } from "@forksofpower/ticketbooth-common";
import { Subjects } from "@forksofpower/ticketbooth-common/build/events/subjects";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
