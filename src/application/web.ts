import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { notFoundMiddleware } from "../middleware/not-found-middleware";
import path from "path";
import { apiRoute } from "../route/api-route";
import { webRoute } from "../route/web-route";
import dotenv from "dotenv";
import { logResponseMiddleware } from "../middleware/log-response-middleware";
import { logRequestMiddleware } from "../middleware/log-request-middleware";

dotenv.config();

const reportPath = process.env.REPORT_PATH as string;

export const web = express();
web.set("view engine", "ejs");
web.set("views", path.join(__dirname, "..", "view"));
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use("/public", express.static(path.join(__dirname, "..", "public")));
web.use("/report", express.static(path.join(reportPath)));
web.use(logResponseMiddleware);
web.use(logRequestMiddleware);
web.use(apiRoute);
web.use(webRoute);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
