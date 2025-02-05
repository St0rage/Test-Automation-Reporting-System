import {
  ImageDetailRequest,
  ReportDetailInsertRequest,
  ReportDetailResponse,
} from "../../model/model";

export interface IReportDetailRepository {
  createImageDetail(imageDetail: ImageDetailRequest): Promise<{ id: number }>;
  updateReportDetail(reportDetail: ReportDetailInsertRequest): Promise<void>;
  checkReportDetailIsExist(
    report_id: number,
    detail_id: number
  ): Promise<ReportDetailResponse | null>;
  findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]>;
  deleteAllReportDetailByReportId(reportId: number): Promise<void>;
}
