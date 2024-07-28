import { IdAndName } from "../../model/model";

export interface IScenarioRepository {
  createOrGetScenarioIdAndName(
    scenarioName: string,
    projectId: number
  ): Promise<IdAndName>;
  checkScenarioIsExist(scenarioName: string): Promise<Boolean>;
}
