import { injectable } from "inversify";
import { IReportDetailRepository } from "../../src/interface/repository/report-detail-repository-interface";
import {
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../../src/model/model";

@injectable()
export class MockReportDetailRepository implements IReportDetailRepository {
  async createReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {}

  async deleteAllReportDetailByReportId(reportId: number): Promise<void> {}

  async findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]> {
    return [
      {
        image: "asdads",
        description: "asdasd",
        status: { name: "FAILED" },
        title: "TITLE",
      },
    ];
  }
}
