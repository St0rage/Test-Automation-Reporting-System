import {
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../../model/model";

export interface IReportDetailRepository {
  createReportDetail(reportDetail: ReportDetailInsertRequest): Promise<void>;
  findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]>;
  deleteAllReportDetailByReportId(reportId: number): Promise<void>;
}
