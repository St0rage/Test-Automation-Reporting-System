import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prismaClient.$on("error", (e) => {
  logger.error({
    message: "Prisma Error Log",
    error: e.message,
  });
});
prismaClient.$on("warn", (e) => {
  logger.warn({
    message: "Prisma Warn Log",
    warn: e.message,
  });
});
prismaClient.$on("info", (e) => {
  logger.info({
    message: "Prisma Info Log",
    info: e.message,
  });
});
prismaClient.$on("query", (e) => {
  logger.info({
    message: "Prisma Query Log",
    params: e.params,
    query: e.query,
  });
});
