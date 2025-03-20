import { injectable } from "inversify";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { IdAndName } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class ScenarioRepository implements IScenarioRepository {
  constructor() {}

  async createOrGetScenarioIdAndName(scenarioName: string, projectId: number): Promise<IdAndName> {
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

  async checkScenarioIsExist(scenarioName: string, projectId: number): Promise<Boolean> {
    const count = await prismaClient.scenario.count({
      where: {
        name: scenarioName,
        project_id: projectId,
      },
    });

    if (count != 1) {
      return false;
    }

    return true;
  }

  getScenarioIdByScenarioNameAndProjectId(scenarioName: string, projectId: number): Promise<{ id: number } | null> {
    return prismaClient.scenario.findFirst({
      where: {
        name: scenarioName,
        project_id: projectId,
      },
      select: {
        id: true,
      },
    });
  }
}
