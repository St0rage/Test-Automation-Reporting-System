import { ReportResponse, SectionFullRespone } from "../../model/model";

export interface IReportBuilder {
  createReport(report: ReportResponse, sections: SectionFullRespone[]): Promise<{ fileName: string; date: number }>;
}
