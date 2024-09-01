import dotenv from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { errorMiddleware } from "../middleware/error-middleware";
import { logRequestMiddleware } from "../middleware/log-request-middleware";
import { logResponseMiddleware } from "../middleware/log-response-middleware";
import { apiRoute } from "../route/api-route";
import { webRoute } from "../route/web-route";
import { notFoundMiddleware } from "../middleware/not-found-middleware";

dotenv.config();

const reportPath = process.env.REPORT_PATH as string;
const secretKey = process.env.SECRET_KEY as string;

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
web.use("/public", express.static(path.join(__dirname, "..", "public")));
web.use("/report", express.static(path.join(reportPath)));
web.use(logRequestMiddleware);
web.use(logResponseMiddleware);
web.use(apiRoute);
web.use(webRoute);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
