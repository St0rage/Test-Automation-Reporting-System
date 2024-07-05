import { ReportRequest } from "../../model/model";

export interface IReportService {
  createReport(reportRequest: ReportRequest): Promise<string>;
  addTestStep(): Promise<void>;
  saveReport(): Promise<void>;
}
