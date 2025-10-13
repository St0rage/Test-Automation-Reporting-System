import { IdAndName, IdAndUniqueId, TestCaseInsertRequest } from "../../model/model";

export interface ITestCaseRepository {
  createOrUpdateTestCase(testCaseInsertRequest: TestCaseInsertRequest): Promise<IdAndName>;
  findAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndUniqueId[]>;
}
