import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Logger } from "./logger";

@injectable()
export class Database {
  public prismaClient;

  constructor(@inject(Logger) private logger: Logger) {
    this.prismaClient = new PrismaClient({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
    });

    this.prismaClient.$on("error", (e) => {
      logger.log.error(e);
    });
    this.prismaClient.$on("warn", (e) => {
      logger.log.warn(e);
    });
    this.prismaClient.$on("info", (e) => {
      logger.log.info(e);
    });
    this.prismaClient.$on("query", (e) => {
      logger.log.info(e);
    });
  }
}
