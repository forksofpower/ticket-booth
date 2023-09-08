import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { OrderCancelledEventData, OrderStatus } from "@forksofpower/ticketbooth-common";

import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

async function setup() {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 40,
    version: 0,
  });
  await order.save();
  // create a fake data event
  const data: OrderCancelledEventData = {
    id: order.id,
    version: 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // create a fake message object
  const msg = {
    ack: jest.fn(),
  };

  return {
    listener,
    order,
    data,
    msg,
  };
}

describe("OrderCancelledListener", () => {
  it("updates the status of the order", async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });
  // it("throws an error if the order is not found", async () => {
  //   const { listener, data, msg } = await setup();

  //   await expect(
  //     listener.onMessage(data, msg as unknown as Message)
  //   ).toThrowError();
  // });
  it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
});
