import { FileRecordResponse, IdAndName, IdAndUniqueId, ProjectScenarioResponse } from "../../model/model";

export interface IWebService {
  getAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  getAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndUniqueId[]>;
  getAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCase: string,
    date: string
  ): Promise<FileRecordResponse[]>;
  getTotalFileRecordByScenarioId(scenarioId: number, testCase: string, date: string): Promise<number>;
  deleteFileRecordById(fileRecordId: number): Promise<void>;
}
