import { IdAndName } from "../../model/model";

export interface ITestCaseRepository {
  createOrGetTestCaseIdAndName(
    testCaseName: string,
    scenarioId: number
  ): Promise<IdAndName>;
}
