import { SectionFullPlainRespone, SectionFullRespone, SectionInsertRequest, SectionResponse } from "../../model/model";

export interface ISectionRepository {
  checkLastSection(reportId: number): Promise<SectionResponse | null>;
  createSection(sectionInsertRequest: SectionInsertRequest): Promise<void>;
  findAllSectionAndTestStepByReportId(reportId: number): Promise<SectionFullRespone[]>;
  findAllSectionAndPlainTestStepByReportId(reportId: number): Promise<SectionFullPlainRespone[]>;
}
