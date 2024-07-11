import { injectable } from "inversify";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { ReportDetailInsertRequest } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ReportDetail implements IReportDetailRepository {
  constructor() {}

  async createReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {
    await prismaClient.reportDetail.create({
      data: reportDetail,
    });
  }
}
