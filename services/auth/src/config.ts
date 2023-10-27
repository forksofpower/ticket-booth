import { getEnv } from "@forksofpower/ticketbooth-common";

type Config = {
  server: {
    port: number;
  };
  mongodb: {
    uri: string;
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
  jwtSecret: getEnv("JWT_SECRET"),
};
