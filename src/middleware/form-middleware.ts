import busboy from "busboy";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import internal, { Transform } from "stream";
import { v4 as uuidv4 } from "uuid";
import { ResponseError } from "../error/response-error";
import { FileSystem } from "../utils/file-system-util";

export const imageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const uploadPath = process.env.IMAGE_PATH as string;
  const imageLimit = parseInt(process.env.IMAGE_LIMIT as string);
  const fileSignatures: Record<string, string> = {
    "image/jpeg": "ffd8ff",
    "image/png": "89504e47",
  };
  const maxFileSize = imageLimit * 1024 * 1024;
  let receivedSize = 0;
  let fileHeader: Buffer | null = null;

  const dataStream = new Transform({
    transform(chunk, encoding, callback) {
      receivedSize += chunk.length;
      if (receivedSize > maxFileSize) {
        return callback(new ResponseError(400, `Maximum limit image size is ${imageLimit}MB`));
      }

      if (!fileHeader) {
        fileHeader = chunk.slice(0, 4);
        const fileHex = fileHeader?.toString("hex");

        const validType = Object.entries(fileSignatures).find(([_, signature]) => fileHex?.startsWith(signature));

        if (!validType) {
          return callback(new ResponseError(400, "Invalid Image Format"));
        }
      }

      callback(null, chunk);
    },
  });

  const generatedFileName = `${uuidv4().replace(/-/g, "")}.jpg`;
  const saveTo = path.join(uploadPath, generatedFileName);

  const sharpStream = sharp().jpeg({ quality: 55 });
  const writeStream = fs.createWriteStream(saveTo);

  req.pipe(dataStream).pipe(sharpStream).pipe(writeStream);

  dataStream.on("error", async (err) => {
    await FileSystem.deleteFile(path.join(uploadPath, generatedFileName));
    dataStream.destroy();
    sharpStream.destroy();
    writeStream.destroy();
    return next(err);
  });

  sharpStream.on("error", () => {
    return;
  });

  writeStream.on("finish", async () => {
    if (receivedSize === 0) {
      await FileSystem.deleteFile(path.join(uploadPath, generatedFileName));
      return next(new ResponseError(400, "Image Required"));
    }

    res.locals.stepDataImageFileName = generatedFileName;
    next();
  });
};

export const reportLogoMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

  bb.on("file", (fieldName: string, file: internal.Readable & { truncated?: boolean }, info: busboy.Info) => {
    isLogoNotUploaded = false;
    if (!allowedFileType.includes(info.mimeType)) {
      flashErrorMessage = "Image (PNG) file required";
      file.resume();
      return;
    }

    const saveTo = path.join(logoPath, fileName);
    // file.pipe(fs.createWriteStream(saveTo));
    file.pipe(sharp().png({ compressionLevel: 9 })).pipe(fs.createWriteStream(saveTo));

    file.on("limit", async () => {
      await FileSystem.deleteFile(saveTo);
      flashErrorMessage = "Maximum limit image size is 1MB";
    });
  });

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
