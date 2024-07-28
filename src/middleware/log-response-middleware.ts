import { NextFunction, Request, Response } from "express";
import { logger } from "../application/logger";

export const logResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  res.on("finish", () => {
    logger.info({
      message: "Request completed",
      logId: res.locals.logId,
      response: {
        method: req.method,
        url: req.url,
        status_code: res.statusCode,
        content_type: res.get("Content-Type"),
        response_time: `${Date.now() - start} ms`,
      },
    });
  });

  next();
};
