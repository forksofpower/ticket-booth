import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@forksofpower/ticketbooth-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
