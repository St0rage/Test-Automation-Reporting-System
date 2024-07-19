import { WebController } from "../controller/web-controller";
import { container } from "../di/inversify.config";
import express from "express";
import {
  downloadMiddleware,
  reportPathValidateMiddleware,
} from "../middleware/web-middleware";
import { web } from "../application/web";
import { logRequestMiddleware } from "../middleware/log-request-middleware";

const webController = container.get<WebController>(WebController);

export const webRoute = express.Router();

webRoute.get(
  "/",
  logRequestMiddleware,
  webController.getDashboardData.bind(webController)
);
webRoute.get(
  "/download/:id",
  logRequestMiddleware,
  downloadMiddleware,
  webController.downloadReport.bind(webController)
);
webRoute.get(
  "/:projectName/:scenarioName",
  logRequestMiddleware,
  reportPathValidateMiddleware,
  webController.getReportData.bind(webController)
);
