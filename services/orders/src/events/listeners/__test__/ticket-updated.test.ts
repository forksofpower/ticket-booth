import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { TicketUpdatedEventData } from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated";

async function setup() {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  // create a fake data object
  const data: TicketUpdatedEventData = {
    id: ticket.id,
    title: "new concert",
    price: 999,
    version: ticket.version + 1,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake message object
  const msg = {
    ack: jest.fn(),
  };
  // return all this stuff
  return {
    msg,
    data,
    ticket,
    listener,
  };
}

describe("TicketUpdatedListener", () => {
  it("finds, updates, and saves a ticket", async () => {
    const { msg, ticket, data, listener } = await setup();
    await listener.onMessage(data, msg as unknown as Message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
  });
  it("acks the message", async () => {
    const { msg, data, listener } = await setup();
    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
  it("does not ack the message if version is out of order", async () => {
    const { listener, data, msg } = await setup();

    data.version = 999;

    try {
      await listener.onMessage(data, msg as unknown as Message);
    } catch (err) {}
    expect(msg.ack).not.toHaveBeenCalled();
  });
});
