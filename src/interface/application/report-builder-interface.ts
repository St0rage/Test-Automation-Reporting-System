import { ReportDetailResponse, ReportResponse } from "../../model/model";

export interface IReportBuilder {
  createReport(
    report: ReportResponse,
    stepDate: ReportDetailResponse[]
  ): Promise<{ fileName: string; date: number }>;
}
