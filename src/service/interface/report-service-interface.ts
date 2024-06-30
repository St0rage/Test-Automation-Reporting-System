import { ReportRequest } from "../../model/report-model";

export interface IReportService {
  createReport(reportRequest: ReportRequest): Promise<string>;
  saveReport(): void;
}
