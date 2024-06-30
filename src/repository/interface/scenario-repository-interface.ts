export interface IScenarioRepository {
  createOrGetScenarioId(
    scenarioName: string,
    projectId: number
  ): Promise<number>;
}
