import {
  ImageDetailRequest,
  PlainTestStepRequest,
  ReportRequest,
  SectionRequest,
  TestStepRequest,
} from "../../model/model";

export interface IReportService {
  addTestImage(reportId: number, imageDetail: ImageDetailRequest): Promise<{ id: number }>;
  createReport(reportRequest: ReportRequest, isPlain: boolean): Promise<string>;
  addSection(sectionRequest: SectionRequest): Promise<void>;
  addTestStep(reportId: number, testStepRequest: TestStepRequest): Promise<void>;
  addPlainTestStep(reportId: number, plainTestStepRequest: PlainTestStepRequest): Promise<void>;
  saveReport(reportId: number, status: boolean): Promise<void>;
  savePlainReport(reportId: number, status: boolean): Promise<void>;
}
