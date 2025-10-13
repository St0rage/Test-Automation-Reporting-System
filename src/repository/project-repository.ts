import { injectable } from "inversify";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IdAndName, ProjectInsertRequest, ProjectScenarioResponse } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ProjectRepository implements IProjectRepository {
  constructor() {}

  async createOrUpdateProject(projectInsertRequest: ProjectInsertRequest): Promise<IdAndName> {
    return prismaClient.project.upsert({
      where: {
        name: projectInsertRequest.name,
      },
      update: projectInsertRequest,
      create: projectInsertRequest,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]> {
    return prismaClient.project.findMany({
      select: {
        id: true,
        name: true,
        scenarios: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async checkProjectIsExist(projectName: string): Promise<Boolean> {
    const count = await prismaClient.project.count({
      where: {
        name: projectName,
      },
    });

    if (count != 1) {
      return false;
    }

    return true;
  }

  async getProjectIdByProjectName(projectName: string): Promise<{ id: number } | null> {
    return prismaClient.project.findFirst({
      where: {
        name: projectName,
      },
      select: {
        id: true,
      },
    });
  }
}
