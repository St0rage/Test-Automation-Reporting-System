import winston from "winston";
import dotenv from "dotenv"

dotenv.config();

const logPath = process.env.LOG_PATH as string;

export const logger = winston.createLogger({
  format: winston.format.printf(log => {
    const msg = typeof log.message === 'string' ? log.message : JSON.stringify(log.message)

    return `${new Date()} : ${log.level.toUpperCase()} : ${msg}`
  }),
  transports: [
    new winston.transports.File({
      filename: logPath + 'application.log'
    })
  ]
})
