import { inject, injectable } from "inversify";
import { IReportService } from "../service/interface/report-service-interface";
import { NextFunction, Request, Response } from "express";
import { ReportRequest } from "../model/report-model";

@injectable()
export class ReportController {
  private reportService: IReportService;

  constructor(@inject("IReportService") reportService: IReportService) {
    this.reportService = reportService;
  }

  public async createReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: ReportRequest = req.body as ReportRequest;
      console.info(request);
      const token = await this.reportService.createReport(request);
      res.status(201).json({
        data: {
          token: token,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
