import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { logger } from "../application/logger";

export const logApiResponseMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  const originalResponse = res.json;

  res.json = function (body: any): Response {
    logger.info(`method : ${req.method}`);
    logger.info(`url : ${req.url}`);
    logger.info(`status code : ${res.statusCode}`);
    logger.info(`content-type : ${res.get("Content-Type")}`);
    logger.info(`response time : ${Date.now() - start} ms`);

    if (req.url === "/api/create-report" && body.data) {
      logger.info(
        `response body : ${JSON.stringify({
          data: {
            token: "token_value",
          },
        })}`
      );
    } else {
      logger.info(`response body : ${JSON.stringify(body)}`);
    }

    return originalResponse.call(this, body);
  };

  next();
};

export const logWebResponseMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  const originalResponse = res.render;
};
