import express, { Router } from "express";
import { ReportController } from "../controller/report-controller";

export class PublicRouter {
  public router: Router;

  constructor(private reportController: ReportController) {
    this.router = express.Router();
  }

  private config(): void {
    this.router.post("/api/create-report");
  }
}
