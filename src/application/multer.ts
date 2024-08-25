// import dotenv from "dotenv";
// import { Request } from "express";
// import multer from "multer";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// import { ResponseError } from "../error/response-error";
// import fs from "fs";

// dotenv.config();

// const imagePath = process.env.IMAGE_PATH as string;
// const allowedFileTypes: RegExp = /jpeg|jpg|png/;
// const maxFileSize = 2 * 1024 * 1024;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, imagePath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4().replace(/-/g, "")}${path.extname(file.originalname)}`);
//   },
// });

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ): void => {
//   const extName = allowedFileTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimeType = allowedFileTypes.test(file.mimetype);

//   if (extName && mimeType) {
//     return cb(null, true);
//   } else {
//     return cb(new ResponseError(400, "Only image file are allowed"));
//   }
// };

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: maxFileSize,
//   },
// }).single("image");

// // Logo Multer
// const maxLogoFileSize = 1 * 1024 * 1024;

// const logoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "..", "public", "img"));
//   },
//   filename: (req, file, cb) => {
//     // const oldLogo = path.join(
//     //   __dirname,
//     //   "..",
//     //   "public",
//     //   "img",
//     //   "report-logo.png"
//     // );
//     // const tempLogo = path.join(
//     //   __dirname,
//     //   "..",
//     //   "public",
//     //   "img",
//     //   "report-logo-temp.png"
//     // );

//     // fs.renameSync(oldLogo, tempLogo);

//     cb(null, `report-logo${path.extname(file.originalname)}`);
//   },
// });

// const logoFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ): void => {
//   if (file.mimetype === "image/png") {
//     return cb(null, true);
//   } else {
//     return cb(new ResponseError(400, "Only PNG file are allowed"));
//   }
// };

// export const uploadLogo = multer({
//   storage: logoStorage,
//   fileFilter: logoFilter,
//   limits: {
//     fileSize: maxLogoFileSize,
//   },
// }).single("logo");
