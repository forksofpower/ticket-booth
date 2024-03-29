import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: New", () => {
  it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(404);
  });
  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });
  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({});

    expect(response.status).not.toEqual(401);
  });
  it("returns an error if an invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        price: 10,
      })
      .expect(400);
  });
  it("returns an error if an invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title: "Test",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title: "Test",
      })
      .expect(400);
  });
  it("creates a ticket given valid inputs", async () => {
    // TODO: add in a check to ensure ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title: "Test",
        price: 20,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
  });
  it("publishes an event", async () => {
    const title = "Test";

    await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title,
        price: 20,
      })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalledWith(
      "ticket:created",
      expect.any(String),
      expect.any(Function)
    );
  });
});
