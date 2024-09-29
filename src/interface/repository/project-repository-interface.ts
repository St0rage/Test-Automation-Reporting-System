import { IdAndName, ProjectScenarioResponse } from "../../model/model";

export interface IProjectRepository {
  createOrGetProjectIdAndName(projectName: string): Promise<IdAndName>;
  findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  checkProjectIsExist(projectName: string): Promise<Boolean>;
  getProjectIdByProjectName(
    projectName: string
  ): Promise<{ id: number } | null>;
}
