import { PrismaClient } from "@prisma/client";

import { logger } from "@cfd/logger";

export const db = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

db.$on("warn", (e) => logger.warn(e));
db.$on("error", (e) => logger.error(e));
