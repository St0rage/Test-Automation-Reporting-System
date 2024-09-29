import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IReportService } from "../interface/service/report-service-interface";
import { ReportDetailRequest, ReportRequest } from "../model/model";

@injectable()
export class ReportController {
  constructor(
    @inject(TYPES.IReportService) private reportService: IReportService
  ) {}

  public async createReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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

  public async addTestStep(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: ReportDetailRequest = res.locals
        .reportDetails as ReportDetailRequest;
      request.report_id = res.locals.reportId as number;
      request.image = res.locals.stepDataImageFileName;

      await this.reportService.addTestStep(request);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  public async saveReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reportId = res.locals.reportId as number;

      await this.reportService.saveReport(reportId);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  public async saveReportAsFailed(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reportId = res.locals.reportId as number;

      await this.reportService.saveReportAsFailed(reportId);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
