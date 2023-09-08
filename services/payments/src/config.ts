import { getEnv } from "@forksofpower/ticketbooth-common";

type Config = {
  mongodb: {
    uri: string;
  };
  server: {
    port: number;
  };
  stripe: {
    secretKey: string;
  };
  nats: {
    url: string;
    clusterId: string;
    clientId: string;
  };
  jwtSecret: string;
};

export const config: Config = {
  mongodb: {
    uri: getEnv("MONGO_URI"),
  },
  server: {
    port: Number(getEnv("PORT")),
  },
  stripe: {
    secretKey: getEnv("STRIPE_SECRET_KEY"),
  },
  nats: {
    url: getEnv("NATS_URL"),
    clusterId: getEnv("NATS_CLUSTER_ID"),
    clientId: getEnv("NATS_CLIENT_ID"),
  },
  jwtSecret: getEnv("JWT_SECRET"),
};
