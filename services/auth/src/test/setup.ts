import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

try {
  dotenv.config({ path: "../../.env" });
} catch (e) {
  throw new Error(e as string);
}

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
