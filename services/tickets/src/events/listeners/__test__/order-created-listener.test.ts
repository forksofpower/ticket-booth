import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import {
  OrderCreatedEventData,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

async function setup() {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create a ticket
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  // create a fake data event
  const data: OrderCreatedEventData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: ticket.userId,
    expiresAt: new Date().toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // create a fake message object
  const msg = {
    ack: jest.fn(),
  };

  return {
    listener,
    ticket,
    data,
    msg,
  };
}

describe("OrderCreatedListener", () => {
  it("publishes a ticket updated event", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const ticketUpdateData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    expect(data.id).toEqual(ticketUpdateData.orderId);
  });
  it("sets the orderId of the ticket", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
  });
  it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
});
