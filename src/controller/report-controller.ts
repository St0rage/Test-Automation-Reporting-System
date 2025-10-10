import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IReportService } from "../interface/service/report-service-interface";
import { ImageDetailRequest, ReportRequest, SectionRequest, TestStepRequest } from "../model/model";
import { destroySessionQueue } from "../application/queue";

@injectable()
export class ReportController {
  constructor(@inject(TYPES.IReportService) private reportService: IReportService) {}

  public async createReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: ReportRequest = req.body as ReportRequest;
      const token = await this.reportService.createReport(request);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: {
          token: token,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  public async addSection(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sectionRequest: SectionRequest = {
        report_id: res.locals.reportId as number,
        name: req.body.name as string,
      };

      await this.reportService.addSection(sectionRequest);

      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  public async addTestImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reportId = res.locals.reportId as number;
      const image = res.locals.stepDataImageFileName as string;

      const imageDetail: ImageDetailRequest = {
        image,
      };

      const testStepId = await this.reportService.addTestImage(reportId, imageDetail);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: {
          test_step_id: testStepId.id,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  public async addTestStep(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reportId = res.locals.reportId as number;

      const request: TestStepRequest = {
        test_step_id: req.body.test_step_id as number,
        title: req.body.title as string,
        description: req.body.description as string,
        status: req.body.status as number,
      };

      await this.reportService.addTestStep(reportId, request);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  public async saveReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = res.locals.token as string;
      const reportId = res.locals.reportId as number;

      await this.reportService.saveReport(reportId, true);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
      destroySessionQueue(token);
    } catch (e) {
      next(e);
    }
  }

  public async saveReportAsFailed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = res.locals.token as string;
      const reportId = res.locals.reportId as number;

      await this.reportService.saveReport(reportId, false);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
      destroySessionQueue(token);
    } catch (e) {
      next(e);
    }
  }
}
