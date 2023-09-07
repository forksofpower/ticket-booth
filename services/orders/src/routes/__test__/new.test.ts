import mongoose from "mongoose";
import request from "supertest";

import { OrderStatus } from "@forksofpower/ticketbooth-common";

import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { authenticateUser } from "../../test/authenticate-user";

describe("Order: New", () => {
  it("returns an error if the ticket does not exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post("/api/orders")
      .set("Cookie", authenticateUser())
      .send({ ticketId })
      .expect(404);
  });

  it("returns an error if the ticket is already reserved", async () => {
    // create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });

    await ticket.save();

    // create an order for the ticket
    const order = Order.build({
      ticket,
      userId: "sdfsdf",
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });

    await order.save();

    // try to reserve the ticket
    await request(app)
      .post("/api/orders")
      .set("Cookie", authenticateUser())
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  it("reserves a ticket", async () => {
    // create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });

    await ticket.save();

    // try to reserve the ticket
    const order = await request(app)
      .post("/api/orders")
      .set("Cookie", authenticateUser())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(order.body.ticket.id).toEqual(ticket.id);
  });

  it("emits an order:created event", async () => {
    // create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "Concert",
      price: 20,
    });

    await ticket.save();

    // try to reserve the ticket
    await request(app)
      .post("/api/orders")
      .set("Cookie", authenticateUser())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
