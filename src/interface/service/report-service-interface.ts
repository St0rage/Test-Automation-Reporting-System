import { ImageDetailRequest, ReportDetailRequest, ReportRequest } from "../../model/model";

export interface IReportService {
  addTestImage(imageDetail: ImageDetailRequest): Promise<{ id: number }>;
  createReport(reportRequest: ReportRequest): Promise<string>;
  addTestStep(reportDetailRequest: ReportDetailRequest): Promise<void>;
  saveReport(reportId: number): Promise<void>;
  saveReportAsFailed(reportId: number): Promise<void>;
}
