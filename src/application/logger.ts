import winston from "winston";
import dotenv from "dotenv";
import DailyRotateFile from "winston-daily-rotate-file";

dotenv.config();

const logPath = process.env.LOG_PATH as string;

export const logger = winston.createLogger({
  format: winston.format.printf((log) => {
    const msg =
      typeof log.message === "string"
        ? log.message
        : JSON.stringify(log.message);

    return `${new Date()} : ${log.level.toUpperCase()} : ${msg}`;
  }),
  transports: [
    new DailyRotateFile({
      filename: `${logPath}application-%DATE%.log`,
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
    }),
  ],
});
