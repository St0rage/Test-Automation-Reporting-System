import express, { NextFunction, Response, Router } from "express";
import { ReportController } from "../controller/report-controller";
import { inject, injectable } from "inversify";
import { exRequest } from "../type/report-request";

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

  public getPrivateRouter(
    authMiddleware: (
      req: exRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ): Router {
    this.privateRouter.use(authMiddleware);

    this.privateRouter.post(
      "/api/add-test-step",
      this.reportController.addTestStep.bind(this.reportController)
    );

    return this.privateRouter;
  }
}
