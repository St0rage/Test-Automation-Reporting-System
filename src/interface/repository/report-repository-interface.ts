import { ReportInsertRequest, ReportResponse } from "../../model/model";

export interface IReportRepository {
  createReport(reportModel: ReportInsertRequest): Promise<{ id: number }>;
  checkReportIsExist(id: number): Promise<Boolean>;
  getReportById(id: number): Promise<ReportResponse>;
  deleteReportById(id: number): Promise<void>;
}
