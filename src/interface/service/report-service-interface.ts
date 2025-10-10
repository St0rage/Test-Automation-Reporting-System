import { ImageDetailRequest, ReportRequest, SectionRequest, TestStepRequest } from "../../model/model";

export interface IReportService {
  addTestImage(reportId: number, imageDetail: ImageDetailRequest): Promise<{ id: number }>;
  createReport(reportRequest: ReportRequest): Promise<string>;
  addSection(sectionRequest: SectionRequest): Promise<void>;
  addTestStep(reportId: number, testStepRequest: TestStepRequest): Promise<void>;
  saveReport(reportId: number, status: boolean): Promise<void>;
}
