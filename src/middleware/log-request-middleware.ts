import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { logger } from "../application/logger";

export const logRequestMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`method : ${req.method}`);
  logger.info(`url : ${req.url}`);
  logger.info(`content-type : ${req.headers["content-type"]}`);
  logger.info(`user-agent : ${req.headers["user-agent"]}`);
  logger.info(`request body : ${JSON.stringify(req.body)}`);
  logger.info(`IP : ${req.ip}`);

  next();
};

export const logApiAddTestStepMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`Method : ${req.method}`);
  logger.info(`URL : ${req.url}`);
  logger.info(`content-type : ${req.headers["content-type"]}`);
  logger.info(`user-agent : ${req.headers["user-agent"]}`);
  logger.info(`body : ${JSON.stringify(req.body)}`);
  logger.info(`files : ${JSON.stringify(req.file)}`);
  logger.info(`IP : ${req.ip}`);

  next();
};
