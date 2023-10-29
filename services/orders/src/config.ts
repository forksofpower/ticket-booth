import { getEnv } from "@forksofpower/ticketbooth-common";

export const config = {
  nodeEnv: getEnv("NODE_ENV"),
  mongodb: {
    uri: getEnv("MONGO_URI"),
  },
  server: {
    port: Number(getEnv("PORT")),
  },
  nats: {
    url: getEnv("NATS_URL"),
    clusterId: getEnv("NATS_CLUSTER_ID"),
    clientId: getEnv("NATS_CLIENT_ID"),
  },
  jwtSecret: getEnv("JWT_SECRET"),
};
