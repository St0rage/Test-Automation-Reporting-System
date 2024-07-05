import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { injectable } from "inversify";
import { AuthUtil } from "../utils/auth-util";
import { exRequest } from "../type/report-request";

@injectable()
export class Middleware {
  static errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({
          errors: error.flatten().fieldErrors,
        })
        .end();
    } else if (error instanceof ResponseError) {
      res
        .status(error.status)
        .json({
          errors: error.message,
        })
        .end();
    } else {
      res
        .status(500)
        .json({
          errors: "Internal Server Error",
        })
        .end();
      console.info(error.message);
    }
  }

  static async authMiddleware(
    req: exRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ResponseError(401, "Unauthorized");
      }

      const decoded = await AuthUtil.verifyJwt(token.split(" ")[1]);

      console.log("DECODED ID : " + decoded.id);

      req.reportId = decoded.id;
      next();
    } catch (e) {
      next(e);
    }
  }
}
