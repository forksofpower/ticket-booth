import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { OrderCreatedEventData, OrderStatus } from "@forksofpower/ticketbooth-common";

import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

async function setup() {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: OrderCreatedEventData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date().toISOString(),
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 40,
    },
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

describe("OrderCreatedListener", () => {
  it("replicates the order data", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    const order = await Order.findById(data.id);
    expect(order).toBeDefined();
    expect(order!.id).toEqual(data.id);
    expect(order!.status).toEqual(data.status);
    expect(order!.userId).toEqual(data.userId);
    expect(order!.price).toEqual(data.ticket.price);
    expect(order!.version).toEqual(data.version);
  });
  it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
});
