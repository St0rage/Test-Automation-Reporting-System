import { PlainTestStepResponse, ReportResponse } from "../../model/model";

export interface IPlainReportBuilder {
  createReport(
    report: ReportResponse,
    plainTestSteps: PlainTestStepResponse[]
  ): Promise<{ fileName: string; date: number }>;
}
