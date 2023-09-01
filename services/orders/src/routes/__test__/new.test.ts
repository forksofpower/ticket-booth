import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

// import { Order } from "../../models/order";
// import { natsWrapper } from "../../nats-wrapper";
// import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: New", () => {
  it("returns an error if the ticket does not exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post("/api/orders")
      .set("Cookie", authenticateUser())
      .send({ ticketId })
      .expect(404);
  });
  it("has a route handler listening to /api/orders for post requests", async () => {});
  it("can only be accessed if the user is signed in", async () => {});
  it("returns a status other than 401 if the user is signed in", async () => {});
});
