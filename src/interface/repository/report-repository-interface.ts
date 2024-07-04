import { ReportInsertRequest } from "../../model/report-model";

export interface IReportRepository {
  createReport(reportModel: ReportInsertRequest): Promise<number>;
}
