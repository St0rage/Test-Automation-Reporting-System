import { inject, injectable } from "inversify";
import { Database } from "../application/database";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { ReportDetailInsertRequest } from "../model/model";

@injectable()
export class ReportDetail implements IReportDetailRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {
    await this.db.prismaClient.reportDetail.create({
      data: reportDetail,
    });
  }
}
