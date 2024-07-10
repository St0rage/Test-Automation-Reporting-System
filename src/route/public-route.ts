import { ReportController } from "../controller/report-controller";
import { container } from "../di/inversify.config";
import express from "express"

const reportController = container.get<ReportController>(ReportController)

export const publicRoute = express.Router()

publicRoute.post("/api/create-report", reportController.createReport.bind(reportController))