import { ReportDetailInsertRequest } from "../../model/model";

export interface IReportDetailRepository {
  createReportDetail(reportDetail: ReportDetailInsertRequest): Promise<void>;
}
