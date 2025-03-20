import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../application/logger";
import { ResponseError } from "../error/response-error";
import { destroySessionQueue } from "../application/queue";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  const token = res.locals.token as string;
  if (error instanceof ZodError) {
    logger.warn({
      message: "Invalid Request",
      logId: res.locals.logId,
      errors: error.message,
    });
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .json({
        errors: error.flatten().fieldErrors,
      })
      .end();
  } else if (error instanceof ResponseError) {
    logger.warn({
      message: "Invalid Request",
      logId: res.locals.logId,
      errors: error.message,
    });
    if (req.path.startsWith("/api")) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(error.status)
        .json({
          errors: error.message,
        })
        .end();
    } else {
      res.status(error.status).render("page/error", {
        status: error.status,
        message: error.message,
      });
      res.end();
    }
  } else {
    logger.error({
      message: "Internal Server Error",
      logId: res.locals.logId,
      errors: error.message,
    });
    if (req.path.startsWith("/api")) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(500)
        .json({
          errors: "Internal Server Error",
        })
        .end();
    } else {
      res.status(500).render("page/error", {
        status: 500,
        message: "Internal Server Error",
      });
      res.end();
    }
  }
  destroySessionQueue(token);
};
