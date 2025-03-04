import { injectable } from "inversify";
import { IReportBuilder } from "../../../src/interface/application/report-builder-interface";
import { ReportDetailResponse, ReportResponse } from "../../../src/model/model";

@injectable()
export class MockReportBuilder implements IReportBuilder {
  async createReport(
    report: ReportResponse,
    stepDate: ReportDetailResponse[]
  ): Promise<{ fileName: string; date: number }> {
    const fileName: string = "report.pdf";
    const date: number = 123123;

    return { fileName, date };
  }
}
