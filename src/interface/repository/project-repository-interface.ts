import { IdAndName, ProjectInsertRequest, ProjectScenarioResponse } from "../../model/model";

export interface IProjectRepository {
  createOrGetProjectIdAndName(projectInsertRequest: ProjectInsertRequest): Promise<IdAndName>;
  findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]>;
  getProjectIdByProjectName(projectName: string): Promise<{ id: number } | null>;
}
