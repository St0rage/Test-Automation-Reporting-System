import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ResponseError } from "../error/response-error";
import { FileSystem } from "../utils/file-system-util";

// export const uploadImage = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   upload(req, res, (err) => {
//     if (!req.file) {
//       return next(new ResponseError(400, "Image file required"));
//     }

//     if (err) {
//       if (err.message === "Only image file are allowed") {
//         return next(err);
//       }

//       if (err.code === "LIMIT_FILE_SIZE") {
//         return next(new ResponseError(400, "Maximum limit image size is 2MB"));
//       }

//       return next(err);
//     }

//     next();
//   });
// };

export const stepDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imagePath = process.env.IMAGE_PATH as string;
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxFileSize = 2 * 1024 * 1024;

  const form = formidable({
    uploadDir: imagePath,
    keepExtensions: true,
    maxFileSize: maxFileSize,
    filter: (file) => {
      if (!file.mimetype) {
        return false;
      }

      if (!allowedFileTypes.includes(file.mimetype)) {
        return false;
      }

      return true;
    },
    filename: (name, ext, part, form) => {
      return `${uuidv4().replace(/-/g, "")}${ext}`;
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      switch (err.code) {
        case 1009:
          return next(
            new ResponseError(400, "Maximum limit image size is 2MB")
          );
      }
      return next(err);
    }

    const file = files.image;

    if (file) {
      if (file.length > 1) {
        await Promise.all(
          file.map(async (value) => {
            await FileSystem.deleteFile(
              path.join(imagePath, value.newFilename)
            );
          })
        );

        return next(
          new ResponseError(400, "Only one image file is allowed per step")
        );
      }
    }

    if (!file) {
      return next(new ResponseError(400, "Image file required"));
    }

    res.locals.stepDataImageFileName = file[0].newFilename;
    res.locals.reportDetails = {};
    for (const [key, value] of Object.entries(fields)) {
      res.locals.reportDetails[key] = Array.isArray(value) ? value[0] : value;
    }
    next();
  });
};

export const reportLogoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logoPath = path.join(__dirname, "..", "public", "img");
  const allowedFileType = "image/png";
  const maxFileSize = 1 * 1024 * 1024;

  const form = formidable({
    uploadDir: logoPath,
    keepExtensions: true,
    maxFileSize: maxFileSize,
    filter: (file) => {
      if (!file.mimetype) {
        return false;
      }

      if (allowedFileType !== file.mimetype) {
        return false;
      }

      return true;
    },
    filename: (name, ext, part, form) => {
      return `report-logo${ext}`;
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      switch (err.code) {
        case 1009:
          return next(
            new ResponseError(400, "Maximum limit image size is 1MB")
          );
      }
      return next(err);
    }

    const file = files.logo;

    if (file) {
      if (file.length > 1) {
        await Promise.all(
          file.map(async (value) => {
            await FileSystem.deleteFile(path.join(logoPath, value.newFilename));
          })
        );

        req.flash("error-logo", "Only one image file is allowed");
        return res.redirect("/settings");
      }
    }

    if (!file) {
      req.flash("error-logo", "Image (PNG) file required");
      return res.redirect("/settings");
    }

    next();
  });
};
