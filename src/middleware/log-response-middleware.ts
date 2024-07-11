import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { logger } from "../application/logger";

export const logResponseMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  const originalResponse = res.json;

  res.json = function (body): Response {
    logger.info(`method : ${req.method}`);
    logger.info(`url : ${req.url}`);
    logger.info(`status code : ${res.statusCode}`);
    logger.info(`content-type : ${res.get("Content-Type")}`),
      logger.info(`response time : ${Date.now() - start} ms`);
    if (req.url === "/api/create-report") {
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
