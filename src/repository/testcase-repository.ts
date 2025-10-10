import { injectable } from "inversify";
import { prismaClient } from "../application/database";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IdAndName, IdAndUniqueId, TestCaseInsertRequest } from "../model/model";

@injectable()
export class TestCaseRepository implements ITestCaseRepository {
  constructor() {}

  async createOrUpdateTestCaseIdAndName(testCaseInsertRequest: TestCaseInsertRequest): Promise<IdAndName> {
    return prismaClient.testCase.upsert({
      where: {
        scenario_id_unique_id: {
          scenario_id: testCaseInsertRequest.scenario_id,
          unique_id: testCaseInsertRequest.unique_id,
        },
      },
      update: testCaseInsertRequest,
      create: testCaseInsertRequest,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndUniqueId[]> {
    return prismaClient.testCase.findMany({
      where: {
        scenario_id: scenarioId,
      },
      select: {
        id: true,
        unique_id: true,
      },
    });
  }
}
