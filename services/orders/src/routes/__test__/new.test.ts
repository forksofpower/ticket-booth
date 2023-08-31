import request from "supertest";

import { app } from "../../app";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import { authenticateUser } from "../../test/authenticate-user";

describe("Ticket: New", () => {});
