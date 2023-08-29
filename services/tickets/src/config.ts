type Config = {
  mongodb: {
    uri: string;
  };
  server: {
    port: number;
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
