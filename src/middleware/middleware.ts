import e, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { injectable } from "inversify";

@injectable()
export class Middleware {
  static errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof ZodError) {
      res.status(400).json({
        errors: error.flatten().fieldErrors,
      });
    } else if (error instanceof ResponseError) {
      res.status(error.status).json({
        errors: error.message,
      });
    } else {
      res.status(500).json({
        errors: "Internal Server Error",
      });
      console.info(error.message);
    }
  }
}
