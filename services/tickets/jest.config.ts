import { Config } from "@jest/types";
import baseConfig from "@ticketbooth/configs/jest-config";

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFilesAfterEnv: ["./src/test/setup.ts"],
};

export default config;
