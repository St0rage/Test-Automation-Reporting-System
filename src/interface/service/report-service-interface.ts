import { ReportDetailRequest, ReportRequest } from "../../model/model";

export interface IReportService {
  createReport(reportRequest: ReportRequest): Promise<string>;
  addTestStep(reportDetailRequest: ReportDetailRequest): Promise<void>;
  saveReport(): Promise<void>;
}
