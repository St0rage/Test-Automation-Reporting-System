import { inject, injectable } from "inversify";
import { IReportRepository } from "./interface/report-repository-interface";
import { Database } from "../application/database";

import { ReportInsertRequest } from "../model/report-model";

@injectable()
export class ReportRepository implements IReportRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  public async createReport(
    reportInsertRequest: ReportInsertRequest
  ): Promise<number> {
    const result = await this.db.report.create({
      data: reportInsertRequest,
      select: {
        id: true,
      },
    });

    return result.id;
  }
}
