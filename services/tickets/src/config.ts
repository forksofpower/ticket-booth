type Config = {
  server: {
    port: number;
  };
  jwtSecret: string;
};

export const config: Config = {
  server: {
    port: Number(process.env.PORT!),
  },
  jwtSecret: process.env.JWT_SECRET!,
};
