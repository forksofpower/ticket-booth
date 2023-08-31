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
    uri: getEnv("MONGO_URI"),
  },
  server: {
    port: Number(getEnv("PORT")),
  },
  nats: {
    url: getEnv("NATS_URL"),
    clusterId: getEnv("NATS_CLUSTER_ID"),
  },
  jwtSecret: getEnv("JWT_SECRET"),
};
