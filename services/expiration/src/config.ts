import { getEnv } from "@forksofpower/ticketbooth-common";

type Config = {
  nats: {
    url: string;
    clusterId: string;
    clientId: string;
  };
  redis: {
    host: string;
  };
};

export const config: Config = {
  redis: {
    host: getEnv("REDIS_HOST"),
  },
  nats: {
    url: getEnv("NATS_URL"),
    clusterId: getEnv("NATS_CLUSTER_ID"),
    clientId: getEnv("NATS_CLIENT_ID"),
  },
};
