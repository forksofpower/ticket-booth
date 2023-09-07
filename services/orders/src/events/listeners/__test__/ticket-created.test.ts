import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { TicketCreatedEventData } from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created";

async function setup() {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEventData = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 15,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // create a fake message object
  const msg = {
    ack: jest.fn(),
  };

  return {
    listener,
    data,
    msg,
  };
}
describe("TicketCreatedListener", () => {
  it("creates and saves a ticket", async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg as unknown as Message);
    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
  });
  it("acknowledges the message", async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
});
