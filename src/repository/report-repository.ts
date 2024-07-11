import { injectable } from "inversify";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { ReportInsertRequest } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ReportRepository implements IReportRepository {
  constructor() {}

  public async createReport(
    reportInsertRequest: ReportInsertRequest
  ): Promise<{ id: number }> {
    const result = await prismaClient.report.create({
      data: reportInsertRequest,
      select: {
        id: true,
      },
    });

    return result;
  }

  public async checkReportIsExist(id: number): Promise<Boolean> {
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
}
