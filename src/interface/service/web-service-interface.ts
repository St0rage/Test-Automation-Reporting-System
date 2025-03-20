import { FileRecordResponse, IdAndName, ProjectScenarioResponse } from "../../model/model";

export interface IWebService {
  getAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  getAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndName[]>;
  getAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCase: string,
    date: string
  ): Promise<FileRecordResponse[]>;
  getTotalFileRecordByScenarioId(scenarioId: number, testCase: string, date: string): Promise<number>;
  validateReportLogo(): Promise<string>;
  deleteFileRecordById(fileRecordId: number): Promise<void>;
}
