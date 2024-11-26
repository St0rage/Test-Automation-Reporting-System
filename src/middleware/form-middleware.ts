import busboy from "busboy";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import internal from "stream";
import { v4 as uuidv4 } from "uuid";
import { ResponseError } from "../error/response-error";
import { FileSystem } from "../utils/file-system-util";

export const stepDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contentType = req.headers["content-type"];

  if (!contentType?.startsWith("multipart/form-data; boundary=")) {
    return next(new ResponseError(400, "multipart/form-data required"));
  }

  const uploadPath = process.env.IMAGE_PATH as string;
  const imageLimit = parseInt(process.env.IMAGE_LIMIT as string);
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxFileSize = imageLimit * 1024 * 1024;

  const bb = busboy({
    headers: req.headers,
    limits: { files: 1, fileSize: maxFileSize },
  });
  const formFields: Record<string, string> = {};
  let newFileName = "";
  let isImageNotExist = true;
  let isImageNotUploaded = false;
  let isImageNotValid = false;
  let isImageFileSizeExceeded = false;
  let isErrorOccured = false;

  bb.on(
    "file",
    (
      fieldName: string,
      file: internal.Readable & { truncated?: boolean },
      info: busboy.FileInfo
    ) => {
      if (fieldName === "image") {
        if (!allowedFileTypes.includes(info.mimeType)) {
          isImageNotValid = true;
          file.resume();
          return;
        }

        isImageNotExist = false;

        const generatedFileName = `${uuidv4().replace(/-/g, "")}.${
          info.mimeType.split("/")[1]
        }`;
        newFileName = generatedFileName;
        const saveTo = path.join(uploadPath, generatedFileName);

        file.pipe(fs.createWriteStream(saveTo));

        file.on("limit", async () => {
          // await FileSystem.deleteFile(saveTo);
          isImageFileSizeExceeded = true;
        });
      } else {
        file.resume();
        isImageNotUploaded = true;
      }
    }
  );

  bb.on("field", (name: string, value: string) => {
    formFields[name] = value;
  });

  bb.on("error", (e) => {
    req.unpipe();
    isErrorOccured = true;
  });

  bb.on("finish", async () => {
    if (isImageNotUploaded || isImageNotValid || isImageNotExist) {
      return next(new ResponseError(400, "image Required"));
    }

    if (isImageFileSizeExceeded) {
      await FileSystem.deleteFile(path.join(uploadPath, newFileName));
      return next(
        new ResponseError(400, `Maximum limit image size is ${imageLimit}MB`)
      );
    }

    res.locals.reportDetails = formFields;
    res.locals.stepDataImageFileName = newFileName;
    next();
  });

  bb.on("close", () => {
    if (isErrorOccured) {
      return next(new ResponseError(400, "multipart/form-data required"));
    }
  });

  req.pipe(bb);
};

export const reportLogoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logoPath = path.join(__dirname, "..", "public", "img");
  const allowedFileType = ["image/png"];
  const maxFileSize = 1 * 1024 * 1024;

  const bb = busboy({
    headers: req.headers,
    limits: { files: 1, fileSize: maxFileSize },
  });

  const fileName = "report-logo-temp.png";
  let flashErrorMessage = "";
  let isLogoNotUploaded = true;

  bb.on(
    "file",
    (
      fieldName: string,
      file: internal.Readable & { truncated?: boolean },
      info: busboy.Info
    ) => {
      isLogoNotUploaded = false;
      if (!allowedFileType.includes(info.mimeType)) {
        flashErrorMessage = "Image (PNG) file required";
        file.resume();
        return;
      }

      const saveTo = path.join(logoPath, fileName);
      file.pipe(fs.createWriteStream(saveTo));

      file.on("limit", async () => {
        await FileSystem.deleteFile(saveTo);
        flashErrorMessage = "Maximum limit image size is 1MB";
      });
    }
  );

  bb.on("finish", () => {
    if (isLogoNotUploaded) {
      req.flash("error-logo", "Image (PNG) file required");
      return res.redirect("/settings");
    }

    if (flashErrorMessage) {
      req.flash("error-logo", flashErrorMessage);
      return res.redirect("/settings");
    }

    next();
  });

  req.pipe(bb);
};
