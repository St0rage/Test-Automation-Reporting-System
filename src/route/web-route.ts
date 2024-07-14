import { WebController } from "../controller/web-controller";
import { container } from "../di/inversify.config";
import express from "express";
import { reportPathValidateMiddleware } from "../middleware/web-middleware";

const webController = container.get<WebController>(WebController);

export const webRoute = express.Router();

webRoute.get("/", webController.getDashboardData.bind(webController));
webRoute.get(
  "/:projectName/:scenarioName",
  reportPathValidateMiddleware,
  webController.getReportData.bind(webController)
);
