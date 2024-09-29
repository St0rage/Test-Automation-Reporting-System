import { IdAndName } from "../../model/model";

export interface IScenarioRepository {
  createOrGetScenarioIdAndName(
    scenarioName: string,
    projectId: number
  ): Promise<IdAndName>;
  checkScenarioIsExist(
    scenarioName: string,
    idProject: number
  ): Promise<Boolean>;
  getScenarioIdByScenarioNameAndProjectId(
    scenarioName: string,
    projectId: number
  ): Promise<{ id: number } | null>;
}
