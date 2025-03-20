import winston, { format } from "winston";
import dotenv from "dotenv";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import moment from "moment";

dotenv.config();

const logPath = process.env.LOG_PATH as string;

const prettyPrintFormat = format.printf(({ level, message, timestamp, ...rest }) => {
  const logMessage = typeof message === "object" ? JSON.stringify(message, null, 2) : message;

  const formattedTimestamp = moment(timestamp).format("DD/MM/YYYY HH:mm:ss");

  return JSON.stringify(
    {
      level,
      timestamp: formattedTimestamp,
      message: logMessage,
      ...rest,
    },
    null,
    2
  );
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), prettyPrintFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(logPath, "application-%DATE%.log"),
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
    }),
  ],
});
