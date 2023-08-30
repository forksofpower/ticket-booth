import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: Show", () => {
  it("returns a 404 if the ticket is not found", async () => {
    await request(app).get("/api/tickets/").send().expect(404);
  });
  it("returns the tickets if the ticket is found", async () => {
    // TODO: add in a check to ensure ticket was saved
    const title = "Test";
    const price = 10;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", authenticateUser())
      .send({
        title,
        price,
      })
      .expect(201);

    const ticket = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .set("Cookie", authenticateUser())
      .send({
        title,
        price,
      })
      .expect(200);
    expect(ticket.body.title).toEqual(title);
    expect(ticket.body.price).toEqual(price);
  });
});
