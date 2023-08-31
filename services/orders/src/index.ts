import mongoose from "mongoose";

import { app } from "./app";
import { config } from "./config";
import { natsWrapper } from "./nats-wrapper";

const port = process.env.PORT || 4000;

const start = async () => {
  if (!config.jwtSecret) throw new Error("JWT_SECRET is undefined");
  if (!config.mongodb.uri) throw new Error("MONGO_URI is undefined");

  try {
    // Connect to NATS Streaming Server
    await natsWrapper.connect(
      config.nats.clusterId,
      "3245345",
      config.nats.url
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // Connect to MongoDB
    await mongoose.connect(config.mongodb.uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
start();
