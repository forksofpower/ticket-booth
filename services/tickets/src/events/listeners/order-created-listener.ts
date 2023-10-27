import { Message } from "node-nats-streaming";

import { Ticket } from "@/models/ticket";
import {
  Listener,
  OrderCreatedEvent,
  OrderCreatedEventData,
  Subjects,
} from "@forksofpower/ticketbooth-common";

import { TicketUpdatedPublisher } from "../publishers/ticket-updated";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "tickets-service";

  async onMessage(data: OrderCreatedEventData, msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket throw error
    if (!ticket) throw new Error("No ticket found");

    // Mark the ticket as reserved by setting the orderId property
    ticket.set({ orderId: data.id });

    // save the ticket
    await ticket.save();

    // publish an event saying the ticket was updated
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    // ack the message
    msg.ack();
  }
}
