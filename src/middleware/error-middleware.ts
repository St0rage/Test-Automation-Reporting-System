import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../application/logger";
import { ResponseError } from "../error/response-error";
import { MulterError } from "multer";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ZodError) {
    logger.info(error.message);
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .json({
        errors: error.flatten().fieldErrors,
      })
      .end();
  } else if (error instanceof ResponseError) {
    logger.info(error.message);
    res.setHeader("Content-Type", "application/json");
    res
      .status(error.status)
      .json({
        errors: error.message,
      })
      .end();
  } else if (error instanceof MulterError) {
    logger.info(error.message);
    if (error.code == "LIMIT_FILE_SIZE") {
      res.setHeader("Content-Type", "application/json");
      res
        .status(400)
        .json({
          errors: "Maximum limit image size is 2MB",
        })
        .end();
    }
  } else {
    logger.error(error.message);
    res.setHeader("Content-Type", "application/json");
    res
      .status(500)
      .json({
        errors: "Internal Server Error",
      })
      .end();
  }
};
