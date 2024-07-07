import express, { NextFunction, Response, Router } from "express";
import { ReportController } from "../controller/report-controller";
import { inject, injectable } from "inversify";
import { exRequest } from "../type/exrequest";
import { FileHandling } from "../application/multer";
import multer from "multer";

@injectable()
export class Route {
  private publicRouter: Router;
  private privateRouter: Router;
  private upload: multer.Multer = this.fileHandling.getUploader();

  constructor(
    @inject(ReportController) private reportController: ReportController,
    @inject(FileHandling) private fileHandling: FileHandling
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
      this.upload.single("image"),
      this.reportController.addTestStep.bind(this.reportController)
    );

    return this.privateRouter;
  }
}
