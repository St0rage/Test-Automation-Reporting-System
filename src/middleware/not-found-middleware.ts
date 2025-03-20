import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ResponseError(404, "Not Found");
  next(error);
};
