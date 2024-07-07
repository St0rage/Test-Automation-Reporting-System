import { inject, injectable } from "inversify";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { Database } from "../application/database";
import { IdAndName } from "../model/model";

@injectable()
export class ProjectRepository implements IProjectRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetProjectIdAndName(projectName: string): Promise<IdAndName> {
    let result = await this.db.prismaClient.project.findFirst({
      where: {
        name: projectName,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (result == null) {
      result = await this.db.prismaClient.project.create({
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
