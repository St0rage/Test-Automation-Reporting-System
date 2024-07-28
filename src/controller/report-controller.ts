import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { NextFunction, Request, Response } from "express";
import { ReportDetailRequest, ReportRequest } from "../model/model";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";

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
      if (!req.file) {
        throw new ResponseError(400, "Image file required");
      }

      const request: ReportDetailRequest = req.body as ReportDetailRequest;
      // request.report_id = req.reportId as number;
      request.report_id = res.locals.reportId as number;
      request.image = req.file.filename;

      await this.reportService.addTestStep(request);
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
