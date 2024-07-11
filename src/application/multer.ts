import multer from "multer";
import { ResponseError } from "../error/response-error";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const imagePath = process.env.IMAGE_PATH as string;
const allowedFileTypes: RegExp = /jpeg|jpg|png/;
const maxFileSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4().replace(/-/g, "")}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb(new ResponseError(400, "Only image file are allowed"));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxFileSize,
  },
});
