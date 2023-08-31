type Config = {
  mongodb: {
    uri: string;
  };
  server: {
    port: number;
  };
  nats: {
    url: string;
    clusterId: string;
  };
  jwtSecret: string;
};

export const config: Config = {
  mongodb: {
    uri: process.env.MONGO_URI!,
  },
  server: {
    port: Number(process.env.PORT!),
  },
  nats: {
    url: process.env.STAN_URL || "http://nats-srv:4222",
    clusterId: process.env.STAN_CLUSTER_ID || "ticketbooth",
  },
  jwtSecret: process.env.JWT_SECRET!,
};
