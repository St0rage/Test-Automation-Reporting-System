import express from "express";
import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import { authMiddleware } from "../middleware/auth-middleware";
import { imageMiddleware } from "../middleware/form-middleware";
import { queueMiddleware } from "../middleware/queue-middleware";

const reportController = container.get<ReportController>(ReportController);

export const apiRoute = express.Router();

apiRoute.post("/api/create-report", reportController.createReport.bind(reportController));

apiRoute.post(
  "/api/add-test-step",
  authMiddleware,
  queueMiddleware,
  reportController.addTestStep.bind(reportController)
);

apiRoute.post(
  "/api/add-test-image",
  authMiddleware,
  queueMiddleware,
  imageMiddleware,
  reportController.addTestImage.bind(reportController)
);

apiRoute.post("/api/save-report", authMiddleware, queueMiddleware, reportController.saveReport.bind(reportController));

apiRoute.post(
  "/api/save-report-failed",
  authMiddleware,
  queueMiddleware,
  reportController.saveReportAsFailed.bind(reportController)
);
