import { PrismaClient } from "@prisma/client";
import winston from "winston";

export class setupDatabase {
  public prismaClient;

  constructor(logger: winston.Logger) {
    this.prismaClient = new PrismaClient({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
    });

    this.prismaClient.$on("error", (e) => {
      logger.error(e);
    });
    this.prismaClient.$on("info", (e) => {
      logger.info(e);
    });
    this.prismaClient.$on("warn", (e) => {
      logger.warn(e);
    });
    this.prismaClient.$on("query", (e) => {
      logger.info(e);
    });
  }
}
