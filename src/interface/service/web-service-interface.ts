import {
  FileRecordResponse,
  IdAndName,
  ProjectScenarioResponse,
} from "../../model/model";

export interface IWebService {
  getAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  getAllTestCaseByScenarioName(scenarioName: string): Promise<IdAndName[]>;
  getAllFileRecordByScenarioName(
    scenarioName: string,
    page: number,
    testCase: string,
    date: string
  ): Promise<FileRecordResponse[]>;
  getTotalFileRecordByScenarioName(
    scenarioName: string,
    testCase: string,
    date: string
  ): Promise<number>;
  validateReportLogo(): Promise<string>;
  deleteFileRecordById(fileRecordId: number): Promise<void>;
}
