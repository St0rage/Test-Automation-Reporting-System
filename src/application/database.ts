import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Logger } from "./logger";

@injectable()
export class Database extends PrismaClient<
  Prisma.PrismaClientOptions,
  "query" | "info" | "warn" | "error"
> {
  constructor(@inject(Logger) logger: Logger) {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
    });

    this.$on("error", (e) => {
      logger.error(e);
    });
    this.$on("warn", (e) => {
      logger.warn(e);
    });
    this.$on("info", (e) => {
      logger.info(e);
    });
    this.$on("query", (e) => {
      logger.info(e);
    });
  }
}
