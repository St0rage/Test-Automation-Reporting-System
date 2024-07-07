import { inject, injectable } from "inversify";
import { Database } from "../application/database";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IdAndName } from "../model/model";

@injectable()
export class TestCaseRepository implements ITestCaseRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetTestCaseIdAndName(
    testCaseName: string,
    scenarioId: number
  ): Promise<IdAndName> {
    let result = await this.db.prismaClient.testCase.findFirst({
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
      result = await this.db.prismaClient.testCase.create({
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
}
