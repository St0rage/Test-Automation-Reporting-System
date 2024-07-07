import { ReportInsertRequest } from "../../model/model";

export interface IReportRepository {
  createReport(reportModel: ReportInsertRequest): Promise<{ id: number }>;
  checkReportIsExist(id: number): Promise<Boolean>;
}
