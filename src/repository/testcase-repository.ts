import { injectable } from "inversify";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IdAndName } from "../model/model";
import { prismaClient } from "../application/database";

@injectable()
export class TestCaseRepository implements ITestCaseRepository {
  constructor() {}

  async createOrGetTestCaseIdAndName(
    testCaseName: string,
    scenarioId: number
  ): Promise<IdAndName> {
    let result = await prismaClient.testCase.findFirst({
      where: {
        scenario_id: scenarioId,
        name: testCaseName,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (result == null) {
      result = await prismaClient.testCase.create({
        data: {
          scenario_id: scenarioId,
          name: testCaseName,
        },
        select: {
          id: true,
          name: true,
        },
      });
    }

    return result;
  }

  async findAllTestCaseByScenarioName(
    scenarioName: string
  ): Promise<IdAndName[]> {
    return prismaClient.testCase.findMany({
      where: {
        scenario: {
          name: scenarioName,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
