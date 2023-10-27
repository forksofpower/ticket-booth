import request from "supertest";

import { app } from "@/app";
import { authenticateUser, buildTicket } from "@/test";

describe("Orders: List", () => {
  it("fetches orders for a particular user", async () => {
    // create three tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    // create one order as user1
    const user1 = authenticateUser();
    const { body: orderOne } = await request(app)
      .post("/api/orders")
      .set("Cookie", user1)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    // create two orders as user2
    const user2 = authenticateUser();
    const { body: orderTwo } = await request(app)
      .post("/api/orders")
      .set("Cookie", user2)
      .send({ ticketId: ticketTwo.id })
      .expect(201);
    const { body: orderThree } = await request(app)
      .post("/api/orders")
      .set("Cookie", user2)
      .send({ ticketId: ticketThree.id })
      .expect(201);

    // make request to get orders for user2
    const response = await request(app)
      .get("/api/orders")
      .set("Cookie", user2)
      .expect(200);

    // Expect user2 orders to not include user1 orders
    expect(response.body.length).toEqual(2);
    expect(response.body.at(0).id).toEqual(orderTwo.id);
    expect(response.body.at(1).id).toEqual(orderThree.id);
    expect(response.body).not.toContain(orderOne);
  });
});
