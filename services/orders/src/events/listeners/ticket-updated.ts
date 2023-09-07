import { Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  TicketUpdatedEvent,
  TicketUpdatedEventData,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = "orders-service";

  async onMessage(data: TicketUpdatedEventData, msg: Message): Promise<void> {
    try {
      const ticket = await Ticket.findOne({
        _id: data.id,
        version: data.version - 1,
      });
      if (!ticket) throw new Error("Ticket not found");

      ticket.set({ price: data.price, title: data.title });

      await ticket.save();

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
