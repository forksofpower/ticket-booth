import { Message } from "node-nats-streaming";

import {
  Listener,
  OrderCancelledEvent,
  OrderCancelledEventData,
  Subjects,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "tickets-service";

  async onMessage(data: OrderCancelledEventData, msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) throw new Error("Ticket not found");

    ticket.set({ orderId: undefined });

    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
