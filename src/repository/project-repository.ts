import { injectable } from "inversify";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IdAndName, ProjectScenarioResponse } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ProjectRepository implements IProjectRepository {
  constructor() {}

  async createOrGetProjectIdAndName(projectName: string): Promise<IdAndName> {
    let result = await prismaClient.project.findFirst({
      where: {
        name: projectName,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (result == null) {
      result = await prismaClient.project.create({
        data: {
          name: projectName,
        },
        select: {
          id: true,
          name: true,
        },
      });
    }

    return result;
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
