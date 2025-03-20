import { IdAndName, ProjectScenarioResponse } from "../../model/model";

export interface IProjectRepository {
  createOrGetProjectIdAndName(projectName: string): Promise<IdAndName>;
  findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  getProjectIdByProjectName(projectName: string): Promise<{ id: number } | null>;
}
