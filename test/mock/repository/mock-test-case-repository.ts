import { injectable } from "inversify";
import { ITestCaseRepository } from "../../../src/interface/repository/testcase-repository-interface";
import { IdAndName } from "../../../src/model/model";

@injectable()
export class MockTestCaseRepository implements ITestCaseRepository {
  private testCases: { id: number; scenarioId: number; name: string }[] = [];

  async createOrGetTestCaseIdAndName(
    testCaseName: string,
    scenarioId: number
  ): Promise<IdAndName> {
    const testCases = this.testCases.find(
      (value) => value.name === testCaseName && value.scenarioId === scenarioId
    );

    if (testCases) {
      return { id: testCases.id, name: testCases.name } as IdAndName;
    }

    return { id: 1, name: testCaseName } as IdAndName;
  }

  async findAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndName[]> {
    return this.testCases
      .filter((value) => value.scenarioId === scenarioId)
      .map(
        (value) =>
          ({
            id: value.id,
            name: value.name,
          } as IdAndName)
      );
  }

  setTestCase(testCases: { id: number; scenarioId: number; name: string }[]) {
    this.testCases = testCases;
  }
}
