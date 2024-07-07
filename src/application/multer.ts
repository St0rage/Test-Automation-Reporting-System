import { injectable } from "inversify";
import multer, { StorageEngine } from "multer";
import { ResponseError } from "../error/response-error";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Request } from "express";

@injectable()
export class FileHandling {
  private storage: StorageEngine;
  private allowedFileTypes: RegExp = /jpeg|jpg|png/;
  private maxFileSize = 2 * 1024 * 1024;

  constructor() {
    this.storage = this.initStorage();
  }

  private initStorage(): StorageEngine {
    const imagePath = process.env.IMAGE_PATH as string;

    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${uuidv4().replace(/-/g, "")}${path.extname(file.originalname)}`
        );
      },
    });
  }

  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ): void {
    const extName = this.allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = this.allowedFileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new ResponseError(400, "Only image file are allowed"));
    }
  }

  public getUploader(): multer.Multer {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter.bind(this),
      limits: {
        fileSize: this.maxFileSize,
      },
    });
  }
}
