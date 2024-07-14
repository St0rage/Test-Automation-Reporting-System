import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { logRequestMiddleware } from "../middleware/log-request-middleware";
import { logResponseMiddleware } from "../middleware/log-response-middleware";
import { notFoundMiddleware } from "../middleware/not-found-middleware";
import path from "path";
import { apiRoute } from "../route/api-route";
import { webRoute } from "../route/web-route";

export const web = express();
web.set("view engine", "ejs");
web.set("views", path.join(__dirname, "..", "view"));
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use("/public", express.static(path.join(__dirname, "..", "public")));
web.use(logRequestMiddleware);
web.use(logResponseMiddleware);
web.use(apiRoute);
web.use(webRoute);
web.use(notFoundMiddleware);
web.use(errorMiddleware);
