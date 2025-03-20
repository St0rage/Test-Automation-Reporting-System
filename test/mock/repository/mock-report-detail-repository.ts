import { injectable } from "inversify";
import { IReportDetailRepository } from "../../../src/interface/repository/report-detail-repository-interface";
import {
  ImageDetailRequest,
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../../../src/model/model";

@injectable()
export class MockReportDetailRepository implements IReportDetailRepository {
  async createReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {}

  async deleteAllReportDetailByReportId(reportId: number): Promise<void> {}

  async findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]> {
    if (reportId === 1) {
      return [
        {
          image: "asdads",
          description: "asdasd",
          status: { name: "PASSED" },
          title: "TITLE",
        },
      ];
    }

    if (reportId === 2) {
      return [
        {
          image: "asdads",
          description: "asdasd",
          status: { name: "FAILED" },
          title: "TITLE",
        },
      ];
    }

    return [];
  }

  async updateReportDetail(
    reportDetail: ReportDetailInsertRequest
  ): Promise<void> {}

  async checkReportDetailIsExist(
    report_id: number,
    detail_id: number
  ): Promise<ReportDetailResponse | null> {
    return null;
  }

  async createImageDetail(
    imageDetail: ImageDetailRequest
  ): Promise<{ id: number }> {
    return { id: 1 };
  }
}
