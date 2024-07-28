import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../application/logger";

export const logRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.locals.logId = uuidv4();

  logger.info({
    message: "Request Send",
    logId: res.locals.logId,
    request: {
      method: req.method,
      url: req.url,
      content_type: req.headers["content-type"],
      user_agent: req.headers["user-agent"],
      ip: req.ip,
    },
  });

  next();
};
