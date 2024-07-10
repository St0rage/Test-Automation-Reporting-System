import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { NextFunction, Request, Response } from "express";
import { ReportDetailRequest, ReportRequest } from "../model/model";
import { exRequest } from "../type/exrequest";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { logger } from "../application/logger";

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
    req: exRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    logger.info(`Method : ${req.method}`)
    logger.info(`URL : ${req.url}`)
    logger.info(`content-type : ${req.headers["content-type"]}`)
    logger.info(`user-agent : ${req.headers["user-agent"]}`)
    logger.info(`body : ${JSON.stringify(req.body)}`)
    logger.info(`files : ${JSON.stringify(req.file)}`)
    logger.info(`IP : ${req.ip}`)

    try {
      if (!req.file) {
        throw new ResponseError(400, "Image file required");
      }

      const request: ReportDetailRequest = req.body as ReportDetailRequest;
      request.report_id = req.reportId as number;
      request.image = req.file.filename;

      await this.reportService.addTestStep(request);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
