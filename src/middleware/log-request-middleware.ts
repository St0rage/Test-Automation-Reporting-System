import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { logger } from "../application/logger";

export const logRequestMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  logger.info({
    message: "Request Send",
    request: {
      method: req.method,
      url: req.url,
      content_type: req.headers["content-type"],
      user_agent: req.headers["user-agent"],
      ip: req.ip,
    },
  });
  // logger.info(`method : ${req.method}`);
  // logger.info(`url : ${req.url}`);
  // logger.info(`content-type : ${req.headers["content-type"]}`);
  // logger.info(`user-agent : ${req.headers["user-agent"]}`);
  // logger.info(`request body : ${JSON.stringify(req.body)}`);
  // logger.info(`IP : ${req.ip}`);

  next();
};
