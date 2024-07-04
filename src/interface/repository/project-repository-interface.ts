export interface IProjectRepository {
  createOrGetProjectId(projectName: string): Promise<number>;
}
