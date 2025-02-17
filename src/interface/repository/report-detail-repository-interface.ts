import {
  ImageDetailRequest,
  ReportDetailInsertRequest,
  ReportDetailResponse,
  ReportDetailResponseWithId,
} from "../../model/model";

export interface IReportDetailRepository {
  createImageDetail(imageDetail: ImageDetailRequest): Promise<{ id: number }>;
  checkLastReportDetail(
    reportId: number
  ): Promise<ReportDetailResponseWithId | null>;
  updateReportDetail(reportDetail: ReportDetailInsertRequest): Promise<void>;
  checkReportDetailIsExist(
    reportId: number,
    detailId: number
  ): Promise<ReportDetailResponse | null>;
  findAllReportDetailByReportId(
    reportId: number
  ): Promise<ReportDetailResponse[]>;
  deleteAllReportDetailByReportId(reportId: number): Promise<void>;
}
