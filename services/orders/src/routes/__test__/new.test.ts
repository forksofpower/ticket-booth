import request from "supertest";

import { app } from "../../app";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: New", () => {
  it("has a route handler listening to /api/orders for post requests", async () => {});
  it("can only be accessed if the user is signed in", async () => {});
  it("returns a status other than 401 if the user is signed in", async () => {});
});
