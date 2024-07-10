import { injectable } from "inversify";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IdAndName } from "../model/model";
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
}
