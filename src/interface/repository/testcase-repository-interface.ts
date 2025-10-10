import { IdAndName, IdAndUniqueId, TestCaseInsertRequest } from "../../model/model";

export interface ITestCaseRepository {
  createOrUpdateTestCaseIdAndName(testCaseInsertRequest: TestCaseInsertRequest): Promise<IdAndName>;
  findAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndUniqueId[]>;
}
