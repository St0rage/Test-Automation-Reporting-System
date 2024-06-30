export interface ITestCaseRepository {
  createOrGetTestCaseId(
    testCaseName: string,
    scenarioId: number
  ): Promise<number>;
}
