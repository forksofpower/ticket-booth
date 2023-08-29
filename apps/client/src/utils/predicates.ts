// environment
export const isProdEnv = process.env.NODE_ENV === "production";
export const isDevEnv = process.env.NODE_ENV === "development";
export const isTestEnv = process.env.NODE_ENV === "test";

// runtime
export const isClient = typeof window !== "undefined";
export const isServer = !isClient;
