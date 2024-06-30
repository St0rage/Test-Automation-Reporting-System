import { injectable } from "inversify";
import winston from "winston";

@injectable()
export class Logger extends winston.Logger {
  constructor() {
    super({
      format: winston.format.json(),
      level: "debug",
      transports: [new winston.transports.Console({})],
    });
  }
}
