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
    page: number
  ): Promise<FileRecordResponse[]>;
  getTotalFileRecordByScenarioName(scenarioName: string): Promise<number>;
}
