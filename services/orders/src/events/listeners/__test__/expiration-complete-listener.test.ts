import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { Order } from "@/models/order";
import { Ticket } from "@/models/ticket";
import { natsWrapper } from "@/nats-wrapper";
import {
  ExpirationCompleteEventData,
  OrderStatus,
} from "@forksofpower/ticketbooth-common";

import { ExpirationCompleteListener } from "../expiration-complete";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEventData = {
    orderId: order.id,
  };

  const msg = {
    ack: jest.fn(),
  };

  return {
    msg,
    ticket,
    order,
    data,
    listener,
  };
};

describe("ExpirationCompleteListener", () => {
  it("emits an OrderCancelled event", async () => {
    const { msg, order, data, listener } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(eventData.id).toEqual(order.id);
  });
  it("updates the order status to cancelled", async () => {
    const { msg, order, data, listener } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });
  it("acks the message", async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg as unknown as Message);

    expect(msg.ack).toHaveBeenCalled();
  });
});
