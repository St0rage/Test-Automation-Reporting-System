import { IdAndName } from "../../model/model";

export interface IProjectRepository {
  createOrGetProjectIdAndName(projectName: string): Promise<IdAndName>;
}
