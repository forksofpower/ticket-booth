import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", authenticateUser())
    .send({ title: "test", price: 10 })
    .expect(201);
};

describe("Ticket: List", () => {
  it("returns a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get("/api/tickets").send().expect(200);
    expect(response.body.length).toEqual(3);
  });
});
