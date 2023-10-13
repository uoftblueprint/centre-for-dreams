import pino from "pino";
import type { LoggerOptions } from "pino";

const developmentOptions: LoggerOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: "debug",
};

const productionOptions: LoggerOptions = {};

export const logger = pino(
  process.env.NODE_ENV === "development"
    ? developmentOptions
    : productionOptions,
);
