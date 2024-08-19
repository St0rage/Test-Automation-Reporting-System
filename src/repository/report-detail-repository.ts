import { injectable } from "inversify";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import {
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ReportDetail implements IReportDetailRepository {
  constructor() {}

  public async createReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {
    await prismaClient.reportDetail.create({
      data: reportDetail,
    });
  }

  public async findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]> {
    return prismaClient.reportDetail.findMany({
      where: {
        report_id: reportId,
      },
      select: {
        title: true,
        description: true,
        image: true,
        status: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async deleteAllReportDetailByReportId(
    reportId: number
  ): Promise<void> {
    await prismaClient.reportDetail.deleteMany({
      where: {
        report_id: reportId,
      },
    });
  }
}
