import express from "express";
import { WebController } from "../controller/web-controller";
import { container } from "../di/inversify.config";
import {
  downloadMiddleware,
  reportPathValidateMiddleware,
} from "../middleware/web-middleware";

const webController = container.get<WebController>(WebController);

export const webRoute = express.Router();

webRoute.get("/", webController.getDashboardData.bind(webController));
webRoute.get(
  "/download/:id",
  downloadMiddleware,
  webController.downloadReport.bind(webController)
);
webRoute.get(
  "/:projectName/:scenarioName",
  reportPathValidateMiddleware,
  webController.getReportData.bind(webController)
);
