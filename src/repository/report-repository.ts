import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { ReportInsertRequest, ReportResponse } from "../model/model";

@injectable()
export class ReportRepository implements IReportRepository {
  constructor() {}

  public async createReport(reportInsertRequest: ReportInsertRequest): Promise<{ id: number }> {
    const result = await prismaClient.report.create({
      data: reportInsertRequest,
      select: {
        id: true,
      },
    });

    return result;
  }

  public async checkReportIsExist(id: number): Promise<boolean> {
    const count = await prismaClient.report.count({
      where: {
        id: id,
      },
    });

    if (count != 1) {
      return false;
    }

    return true;
  }

  public async getReportPlainStatus(id: number): Promise<boolean> {
    const report = await prismaClient.report.findFirst({
      where: {
        id: id,
      },
      select: {
        is_plain: true,
      },
    });

    return report!.is_plain;
  }

  public async getReportById(id: number): Promise<ReportResponse> {
    const report = await prismaClient.report.findFirst({
      where: {
        id: id,
      },
      select: {
        project: {
          select: {
            name: true,
            platform: true,
            tool: {
              select: {
                name: true,
              },
            },
          },
        },
        test_case: {
          select: {
            id: true,
            name: true,
            unique_id: true,
            expected_result: true,
            criteria: true,
            description: true,
            scenario: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        activity: true,
        author: true,
      },
    });

    return report as ReportResponse;
  }

  public async deleteReportById(id: number): Promise<void> {
    await prismaClient.report.delete({
      where: {
        id: id,
      },
    });
  }
}
