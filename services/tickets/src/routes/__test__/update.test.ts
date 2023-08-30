import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: Update", () => {
  it("returns a 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", authenticateUser())
      .send({ title: "test", price: 20 })
      .expect(404);
  });
  it("returns a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: "test", price: 20 })
      .expect(401);
  });
  it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser()) // <-- user 1
      .send({
        title: "Test",
        price: 20,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", authenticateUser()) // <-- user 2
      .send({ title: "test", price: 20 })
      .expect(401);
  });
  it("returns a 400 if the user provides an invalid title or price", async () => {
    const cookie = authenticateUser();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "Test",
        price: 20,
      })
      .expect(201);

    // invalid title
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20,
      })
      .expect(400);
    // invalid price
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "Test",
        price: -20,
      })
      .expect(400);
  });
  it("updates the ticket provided valid inputs", async () => {
    const cookie = authenticateUser();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "Test",
        price: 20,
      })
      .expect(201);
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "new title",
        price: 100,
      })
      .expect(200);

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);
    expect(ticket.body.title).toEqual("new title");
    expect(ticket.body.price).toEqual(100);
  });
});
