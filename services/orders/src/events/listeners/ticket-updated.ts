import { Message } from "node-nats-streaming";

import { Ticket } from "@/models/ticket";
import {
  Listener,
  Subjects,
  TicketUpdatedEvent,
  TicketUpdatedEventData,
} from "@forksofpower/ticketbooth-common";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = "orders-service";

  async onMessage(data: TicketUpdatedEventData, msg: Message) {
    // Find the ticket
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) throw new Error("Ticket not found");

    // Update the ticket
    ticket.set({ price: data.price, title: data.title });
    await ticket.save();

    // Acknowledge the message
    msg.ack();
  }
}
