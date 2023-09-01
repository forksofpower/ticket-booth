import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { getEnv } from "@forksofpower/ticketbooth-common";

dotenv.config({ path: "../../.env" });

jest.mock("../nats-wrapper");
// mock getEnv from @forksofpower/ticketbooth-common
jest.mock("@forksofpower/ticketbooth-common", () => ({
  getEnv: jest.fn(),
}));

let mongo: MongoMemoryServer;
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

/**
 * Clear all collections before each test.
 */
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
