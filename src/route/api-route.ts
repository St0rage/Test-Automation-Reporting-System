import { upload } from "../application/multer";
import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import {
  logApiAddTestStepMiddleware,
  logRequestMiddleware,
} from "../middleware/log-request-middleware";
import { logApiResponseMiddleware } from "../middleware/log-response-middleware";

const reportController = container.get<ReportController>(ReportController);

export const apiRoute = express.Router();

apiRoute.use(logApiResponseMiddleware);

apiRoute.post(
  "/api/create-report",
  logRequestMiddleware,
  reportController.createReport.bind(reportController)
);

apiRoute.post(
  "/api/add-test-step",
  logApiAddTestStepMiddleware,
  authMiddleware,
  upload.single("image"),
  reportController.addTestStep.bind(reportController)
);
