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
    uri: process.env.MONGO_URI!,
  },
  server: {
    port: Number(process.env.PORT!),
  },
  jwtSecret: process.env.JWT_SECRET!,
};
