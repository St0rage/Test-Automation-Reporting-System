import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import {
  ImageDetailRequest,
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../model/model";

@injectable()
export class ReportDetailRepository implements IReportDetailRepository {
  constructor() {}

  // public async createReportDetail(
  //   reportDetail: ReportDetailInsertRequest
  // ): Promise<void> {
  //   await prismaClient.reportDetail.create({
  //     data: reportDetail,
  //   });
  // }

  public async createImageDetail(
    imageDetail: ImageDetailRequest
  ): Promise<{ id: number }> {
    const result = await prismaClient.reportDetail.create({
      data: {
        report_id: imageDetail.report_id,
        image: imageDetail.image,
      },
    });

    return { id: result.id };
  }

  public async updateReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {
    await prismaClient.reportDetail.updateMany({
      where: {
        AND: {
          report_id: reportDetail.report_id,
          id: reportDetail.detail_id,
        },
      },
      data: {
        title: reportDetail.title,
        description: reportDetail.description,
        status_id: reportDetail.status_id,
      },
    });
  }

  public async checkReportDetailIsExist(
    report_id: number,
    detail_id: number
  ): Promise<ReportDetailResponse | null> {
    return prismaClient.reportDetail.findFirst({
      where: {
        report_id: report_id,
        id: detail_id,
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

  public async findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]> {
    return await prismaClient.reportDetail.findMany({
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
