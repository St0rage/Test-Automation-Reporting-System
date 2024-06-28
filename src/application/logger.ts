import winston from "winston";

export class setupLogger {
  public logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      level: "debug",
      transports: [new winston.transports.Console({})],
    });
  }
}
