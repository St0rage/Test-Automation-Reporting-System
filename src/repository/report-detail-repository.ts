import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import {
  ImageDetailInsertRequest,
  ImageDetailRequest,
  ReportDetailInsertRequest,
  ReportDetailResponse,
  ReportDetailResponseWithId,
} from "../model/model";

@injectable()
export class ReportDetailRepository implements IReportDetailRepository {
  constructor() {}

  public async createImageDetail(
    imageDetail: ImageDetailInsertRequest
  ): Promise<{ id: number }> {
    const result = await prismaClient.reportDetail.create({
      data: {
        report_id: imageDetail.report_id,
        step_number: imageDetail.step_number,
        image: imageDetail.image,
      },
    });

    return { id: result.id };
  }

  public async checkLastReportDetail(
    reportId: number
  ): Promise<ReportDetailResponseWithId | null> {
    return prismaClient.reportDetail.findFirst({
      orderBy: { id: "desc" },
      where: {
        report_id: reportId,
      },
      select: {
        id: true,
        step_number: true,
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
    reportId: number,
    detailId: number
  ): Promise<ReportDetailResponse | null> {
    return prismaClient.reportDetail.findFirst({
      where: {
        report_id: reportId,
        id: detailId,
      },
      select: {
        step_number: true,
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
        step_number: true,
        title: true,
        description: true,
        image: true,
        status: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        step_number: "asc",
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
