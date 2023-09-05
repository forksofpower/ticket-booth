import { Message } from "node-nats-streaming";

import {
  Listener,
  TicketCreatedEvent,
  TicketCreatedEventData,
} from "@forksofpower/ticketbooth-common";
import { Subjects } from "@forksofpower/ticketbooth-common/build/events/subjects";

/**
 * Listener
 */
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  onMessage(data: TicketCreatedEventData, msg: Message): void {
    console.log("Event Data:", {
      id: data.id,
      title: data.title,
      price: data.price,
    });

    // successful message
    msg.ack();
  }
}
