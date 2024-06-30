import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export class Middleware {
  public errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof ZodError) {
      res.status(400).json({
        errors: `Validation Error : ${JSON.stringify(error)}`,
      });
    } else if (error instanceof ResponseError) {
      res.status(error.status).json({
        errors: error.message,
      });
    } else {
      res.status(500).json({
        errors: "WADUH ERROR",
      });
      console.info(error.message);
    }
  }
}
