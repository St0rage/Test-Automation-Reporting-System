import { injectable } from "inversify";
import { IProjectRepository } from "../../src/interface/repository/project-repository-interface";
import { IdAndName, ProjectScenarioResponse } from "../../src/model/model";

@injectable()
export class MockProjectRepository implements IProjectRepository {
  private projects: { id: number; name: string }[] = [];
  private projectScenarios: ProjectScenarioResponse[] = [];

  async createOrGetProjectIdAndName(projectName: string): Promise<IdAndName> {
    const projectIdAndName = this.projects.find(
      (value) => value.name === projectName
    );

    if (projectIdAndName) {
      return projectIdAndName as IdAndName;
    }

    return { id: 1, name: projectName } as IdAndName;
  }

  async findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]> {
    return this.projectScenarios;
  }

  async getProjectIdByProjectName(
    projectName: string
  ): Promise<{ id: number } | null> {
    const project = this.projects.find((value) => value.name === projectName);

    if (!project) {
      return null;
    }

    return { id: project.id };
  }

  setProjects(projects: { id: number; name: string }[]) {
    this.projects = projects;
  }

  setProjectScenarios(projectScenarios: ProjectScenarioResponse[]) {
    this.projectScenarios = projectScenarios;
  }
}
