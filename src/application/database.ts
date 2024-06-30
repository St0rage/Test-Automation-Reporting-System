import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Logger } from "./logger";

// export class Database extends PrismaClient<
//   Prisma.PrismaClientOptions,
//   "query" | "info" | "warn" | "error"
// > {
//   constructor(@inject(Logger) logger: Logger) {
//     super({
//       log: [
//         { emit: "event", level: "query" },
//         { emit: "event", level: "info" },
//         { emit: "event", level: "warn" },
//         { emit: "event", level: "error" },
//       ],
//     });

//     this.$on("error", (e) => {
//       logger.log.error(e);
//     });
//     this.$on("warn", (e) => {
//       logger.log.warn(e);
//     });
//     this.$on("info", (e) => {
//       logger.log.info(e);
//     });
//     this.$on("query", (e) => {
//       logger.log.info(e);
//     });
//   }
// }
@injectable()
export class Database {
  public prismaClient;

  constructor(@inject(Logger) public logger: Logger) {
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
