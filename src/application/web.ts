import flash from "connect-flash";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import path from "path";
import { errorMiddleware } from "../middleware/error-middleware";
import { logRequestMiddleware } from "../middleware/log-request-middleware";
import { logResponseMiddleware } from "../middleware/log-response-middleware";
import { notFoundMiddleware } from "../middleware/not-found-middleware";
import { adminRoute } from "../route/admin-route";
import { projectRoute } from "../route/project-route";

dotenv.config();

const reportPath = process.env.REPORT_PATH as string;
const secretKey = process.env.SECRET_KEY as string;
const useStatic = process.env.USE_STATIC as string;

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.set("view engine", "ejs");
web.set("views", path.join(__dirname, "..", "view"));
web.use(
  session({
    secret: secretKey,
    saveUninitialized: false,
    resave: false,
  })
);
web.use(flash());
if (useStatic === "Y") {
  web.use("/public", express.static(path.join(__dirname, "..", "public")));
  web.use("/report", express.static(path.join(reportPath)));
}
web.use(logRequestMiddleware);
web.use(logResponseMiddleware);
// web.use(apiRoute);
// web.use(webRoute);
web.use(adminRoute);
web.use(projectRoute);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
