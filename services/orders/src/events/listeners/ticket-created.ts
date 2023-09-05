import { Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketCreatedEventData,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../models/ticket";

/**
 * Listener
 */
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  async onMessage(
    { title, price }: TicketCreatedEventData,
    msg: Message
  ): Promise<void> {
    try {
      const ticket = Ticket.build({
        title: title,
        price: price,
      });

      await ticket.save();
    } catch (err) {
      console.error(err);
    }

    // successful message
    msg.ack();
  }
}
