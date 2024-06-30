import { injectable } from "inversify";
import winston from "winston";
@injectable()
export class Logger {
  public log;

  constructor() {
    this.log = winston.createLogger({
      format: winston.format.json(),
      level: "debug",
      transports: [new winston.transports.Console({})],
    });
  }
}
