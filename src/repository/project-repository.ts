import { inject, injectable } from "inversify";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { Database } from "../application/database";

@injectable()
export class ProjectRepository implements IProjectRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetProjectId(projectName: string): Promise<number> {
    let result = await this.db.prismaClient.project.findFirst({
      where: {
        name: projectName,
      },
      select: {
        id: true,
      },
    });
    if (result == null) {
      result = await this.db.prismaClient.project.create({
        data: {
          name: projectName,
        },
        select: {
          id: true,
        },
      });
    }
    return result.id;
  }
}
