import { inject, injectable } from "inversify";
import { Database } from "../application/database";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";

@injectable()
export class ScenarioRepository implements IScenarioRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetScenarioId(
    scenarioName: string,
    projectId: number
  ): Promise<number> {
    let result = await this.db.prismaClient.scenario.findFirst({
      where: {
        project_id: projectId,
        name: scenarioName,
      },
      select: {
        id: true,
      },
    });

    if (result == null) {
      result = await this.db.prismaClient.scenario.create({
        data: {
          project_id: projectId,
          name: scenarioName,
        },
        select: {
          id: true,
        },
      });
    }

    return result.id;
  }
}
