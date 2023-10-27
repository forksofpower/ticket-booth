import mongoose from "mongoose";

import { app } from "@/app";
import { config } from "@/config";
import {
  ExpirationCompleteListener,
  TicketCreatedListener,
  TicketUpdatedListener,
} from "@/events/listeners";
import { natsWrapper } from "@/nats-wrapper";

const port = config.server.port;

const listeners = [
  TicketCreatedListener,
  TicketUpdatedListener,
  ExpirationCompleteListener,
  ExpirationCompleteListener,
];

const start = async () => {
  if (!config.jwtSecret) throw new Error("JWT_SECRET is undefined");
  if (!config.mongodb.uri) throw new Error("MONGO_URI is undefined");

  try {
    // Connect to NATS Streaming Server
    await natsWrapper.connect(
      config.nats.clusterId,
      config.nats.clientId,
      config.nats.url
    );
    natsWrapper.client.on("close", (data) => {
      console.log("NATS connection closed", data);
      throw new Error("NATS connection closed");
    });

    // Start Event Listeners
    for (const listener of listeners) {
      new listener(natsWrapper.client).listen();
    }

    // Connect to MongoDB
    const mongoConn = await mongoose.connect(config.mongodb.uri);
    console.log("Connected to MongoDB");

    // Graceful Shutdown
    const cleanUp = async () => {
      natsWrapper.client.close();
      await mongoConn.connection.close();
    };

    process.on("SIGINT", cleanUp);
    process.on("SIGTERM", cleanUp);
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
start();
