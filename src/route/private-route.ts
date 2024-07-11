import { upload } from "../application/multer";
import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

const reportController = container.get<ReportController>(ReportController);

export const privateRoute = express.Router();

privateRoute.post(
  "/api/add-test-step",
  authMiddleware,
  upload.single("image"),
  reportController.addTestStep.bind(reportController)
);
