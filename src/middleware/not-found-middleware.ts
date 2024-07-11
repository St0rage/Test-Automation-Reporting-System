import { NextFunction, Response } from "express";
import { exRequest } from "../type/exrequest";
import { ResponseError } from "../error/response-error";

export const notFoundMiddleware = (
  req: exRequest,
  res: Response,
  next: NextFunction
) => {
  const error = new ResponseError(404, "Not Found");
  next(error);
};
