import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";
import { injectable } from "inversify";
import { AuthUtil } from "../utils/auth-util";
import { exRequest } from "../type/exrequest";
import { MulterError } from "multer";
import { FileSystem } from "../utils/file-system-uti";

@injectable()
export class Middleware {
  static errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof ZodError) {
      if (req.file) {
        const imagePath = process.env.IMAGE_PATH as string;
        console.log(req.file.filename);
        try {
          FileSystem.deleteFile(`${imagePath}${req.file.filename}`);
        } catch (e) {
          res
            .status(500)
            .json({
              errors: "Internal Server Error",
            })
            .end();
        }
      }
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
    } else if (error instanceof MulterError) {
      if (error.code == "LIMIT_FILE_SIZE") {
        res.status(400).json({
          errors: "Maximum limit image size is 2MB",
        }).end;
      }
    } else {
      if (req.file) {
        const imagePath = process.env.IMAGE_PATH as string;
        console.log(req.file.filename);
        try {
          FileSystem.deleteFile(`${imagePath}${req.file.filename}`);
        } catch (e) {
          res
            .status(500)
            .json({
              errors: "Internal Server Error",
            })
            .end();
        }
      }
      res
        .status(500)
        .json({
          errors: "Internal Server Error",
        })
        .end();
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

      req.reportId = decoded.id;
      next();
    } catch (e) {
      next(e);
    }
  }
}
