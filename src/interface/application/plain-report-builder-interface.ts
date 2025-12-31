import { PlainTestStepResponse, ReportResponse, SectionFullPlainRespone } from "../../model/model";

export interface IPlainReportBuilder {
  createReport(
    report: ReportResponse,
    sections: SectionFullPlainRespone[]
  ): Promise<{ fileName: string; date: number }>;
}
