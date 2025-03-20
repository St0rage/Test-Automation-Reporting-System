import { IdAndName } from "../../model/model";

export interface IScenarioRepository {
  createOrGetScenarioIdAndName(scenarioName: string, projectId: number): Promise<IdAndName>;
  getScenarioIdByScenarioNameAndProjectId(scenarioName: string, projectId: number): Promise<{ id: number } | null>;
}
