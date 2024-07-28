import express from "express";
import { upload } from "../application/multer";
import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import { authMiddleware } from "../middleware/auth-middleware";

const reportController = container.get<ReportController>(ReportController);

export const apiRoute = express.Router();

apiRoute.post(
  "/api/create-report",
  reportController.createReport.bind(reportController)
);

apiRoute.post(
  "/api/add-test-step",
  authMiddleware,
  upload.single("image"),
  reportController.addTestStep.bind(reportController)
);
