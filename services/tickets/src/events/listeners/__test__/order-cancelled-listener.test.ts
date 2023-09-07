import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { OrderCancelledEventData } from "@forksofpower/ticketbooth-common";

import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

async function setup() {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create a ticket
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  await ticket
    .set({ orderId: new mongoose.Types.ObjectId().toHexString() })
    .save();

  // create a fake data event
  const data: OrderCancelledEventData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
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

describe("OrderCancelledListener", () => {
  it("clears the ticket orderId, publishes a ticket update event, acks the message", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(null);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const ticketUpdateData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    expect(ticketUpdateData.orderId).toEqual(undefined);
  });
});
