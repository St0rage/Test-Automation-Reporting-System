import { injectable } from "inversify";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { IdAndName } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ScenarioRepository implements IScenarioRepository {

  constructor() {}

  async createOrGetScenarioIdAndName(
    scenarioName: string,
    projectId: number
  ): Promise<IdAndName> {
    let result = await prismaClient.scenario.findFirst({
      where: {
        project_id: projectId,
        name: scenarioName,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (result == null) {
      result = await prismaClient.scenario.create({
        data: {
          project_id: projectId,
          name: scenarioName,
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
