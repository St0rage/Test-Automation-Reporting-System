import express from "express";
import { WebController } from "../controller/web-controller";
import { container } from "../di/inversify.config";
import { reportLogoMiddleware } from "../middleware/form-middleware";
import {
  deleteFileRecordMiddleware,
  downloadMiddleware,
  reportPathValidateMiddleware,
} from "../middleware/web-middleware";
import methodOverride from "method-override";

const webController = container.get<WebController>(WebController);

export const webRoute = express.Router();

webRoute.use(methodOverride("_method"));

webRoute.get("/", webController.getDashboardData.bind(webController));
webRoute.get("/settings", webController.settings.bind(webController));
webRoute.get("/download/:id", downloadMiddleware, webController.downloadReport.bind(webController));
webRoute.get(
  "/:projectName/:scenarioName",
  reportPathValidateMiddleware,
  webController.getReportData.bind(webController)
);
webRoute.post("/change-report-logo", reportLogoMiddleware, webController.changeReportLogo.bind(webController));
webRoute.delete(
  "/delete-file-record/:fileRecordId",
  deleteFileRecordMiddleware,
  webController.deleteFileRecord.bind(webController)
);
