import express, { Router } from "express";
import { ReportController } from "../controller/report-controller";
import { inject, injectable } from "inversify";

@injectable()
export class Route {
  private publicRouter: Router;
  private privateRouter: Router;

  constructor(
    @inject(ReportController) private reportController: ReportController
  ) {
    this.publicRouter = express.Router();
    this.privateRouter = express.Router();
  }

  public getPublicRoute(): Router {
    this.publicRouter.post(
      "/api/create-report",
      this.reportController.createReport.bind(this.reportController)
    );

    return this.publicRouter;
  }

  public configPrivateRouter(): void {}
}
