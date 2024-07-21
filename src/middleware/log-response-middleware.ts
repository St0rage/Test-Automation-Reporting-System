import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { logger } from "../application/logger";

export const logResponseMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  res.on("finish", () => {
    // logger.info(`method : ${req.method}`);
    // logger.info(`url : ${req.url}`);
    // logger.info(`status code : ${res.statusCode}`);
    // logger.info(`content-type : ${res.get("Content-Type")}`);
    // logger.info(`response time : ${Date.now() - start} ms`);

    logger.info({
      message: "Request completed",
      response: {
        method: req.method,
        url: req.url,
        status_code: req.statusCode,
        content_type: res.get("Content-Type"),
        response_time: `${Date.now() - start} ms`,
      },
    });

    // if (req.url === "/api/create-report" && responseBody.data) {
    //   logger.info(
    //     `response body : ${JSON.stringify({
    //       data: {
    //         token: "token_value",
    //       },
    //     })}`
    //   );
    // } else {
    //   logger.info(`response body : ${JSON.stringify(responseBody)}`);
    // }
  });

  next();
};

// export const logWebResponseMiddleware = (
//   req: exRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const start = Date.now();

//   res.on("finish", () => {
//     logger.info(`method : ${req.method}`);
//     logger.info(`url : ${req.url}`);
//     logger.info(`status code : ${res.statusCode}`);
//     logger.info(`content-type : ${res.get("Content-Type")}`);
//     logger.info(`response time : ${Date.now() - start} ms`);
//   });

//   next();
// };
