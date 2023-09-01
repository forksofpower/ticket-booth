import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { authenticateUser } from "../../test/authenticate-user";
import { buildTicket } from "../../test/build-ticket";

describe("Order: Show", () => {
  it("returns a 404 if the ticket is not found", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Cookie", authenticateUser())
      .expect(404);
  });
  it("returns the ticket if the ticket is found", async () => {
    const ticket = await buildTicket();

    const user = authenticateUser();
    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .expect(200);
  });
});
