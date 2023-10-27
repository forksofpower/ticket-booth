import { Message } from "node-nats-streaming";

import { Ticket } from "@/models/ticket";
import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketCreatedEventData,
} from "@forksofpower/ticketbooth-common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  async onMessage(
    { title, price, id }: TicketCreatedEventData,
    msg: Message
  ): Promise<void> {
    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    // Acknowledge the message
    msg.ack();
  }
}
