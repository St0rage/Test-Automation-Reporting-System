import express from "express";
import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import { authMiddleware } from "../middleware/auth-middleware";
import { stepDataMiddleware } from "../middleware/image-middleware";

const reportController = container.get<ReportController>(ReportController);

export const apiRoute = express.Router();

apiRoute.post(
  "/api/create-report",
  reportController.createReport.bind(reportController)
);

apiRoute.post(
  "/api/add-test-step",
  authMiddleware,
  stepDataMiddleware,
  reportController.addTestStep.bind(reportController)
);

apiRoute.post(
  "/api/save-report",
  authMiddleware,
  reportController.saveReport.bind(reportController)
);
