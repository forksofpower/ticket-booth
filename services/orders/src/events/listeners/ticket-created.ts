import { Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketCreatedEventData,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  async onMessage(
    { title, price, id }: TicketCreatedEventData,
    msg: Message
  ): Promise<void> {
    try {
      const ticket = Ticket.build({
        id,
        title,
        price,
      });

      await ticket.save();
      // successful message
      msg.ack();
    } catch (err) {
      console.error(err);
    }
  }
}
