import mongoose, { mongo } from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
// import { Ticket } from "../../models/ticket";
// import { natsWrapper } from "../../nats-wrapper";
import { authenticateUser } from "../../test/authenticate-user";

describe("Charge: New", () => {
  it("has a route handler listening to /api/payments for post requests", async () => {
    const response = await request(app).post("/api/payments").send({});
    expect(response.status).not.toEqual(404);
  });
  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/payments").send({}).expect(401);
  });
  it("returns an error if an invalid token is provided", async () => {
    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        token: "",
        orderId: "test",
      })
      .expect(400);

    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        orderId: "test",
      })
      .expect(400);
  });
  it("returns an error if an invalid orderId is provided", async () => {
    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        token: "test",
        orderId: "",
      })
      .expect(400);

    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        token: "test",
      })
      .expect(400);
  });
  it("returns a 404 if an order is not found", async () => {
    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        token: "test",
        orderId: new mongoose.Types.ObjectId().toHexString(),
      })
      .expect(404);
  });
  it("returns a 401 if the order is not owned by the user", async () => {
    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: 20,
      status: OrderStatus.Created,
    });
    await order.save();
    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser())
      .send({
        token: "test",
        orderId: order.id,
      })
      .expect(401);
  });
  it("returns a 400 if the order is cancelled", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      price: 20,
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await request(app)
      .post("/api/payments")
      .set("Cookie", authenticateUser(userId))
      .send({
        token: "test",
        orderId: order.id,
      })
      .expect(400);
  });
});
