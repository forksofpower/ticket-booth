import { Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketCreatedEventData,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  async onMessage(data: TicketCreatedEventData, msg: Message): Promise<void> {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!ticket) throw new Error("Ticket not found");

    ticket.set({ price: data.price, title: data.title });

    await ticket.save();

    msg.ack();
  }
}
