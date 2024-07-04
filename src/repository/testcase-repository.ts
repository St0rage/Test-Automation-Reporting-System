import { inject, injectable } from "inversify";
import { Database } from "../application/database";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";

@injectable()
export class TestCaseRepository implements ITestCaseRepository {
  private db: Database;

  constructor(@inject(Database) db: Database) {
    this.db = db;
  }

  async createOrGetTestCaseId(
    testCaseName: string,
    scenarioId: number
  ): Promise<number> {
    let result = await this.db.prismaClient.testCase.findFirst({
      where: {
        scenario_id: scenarioId,
        name: testCaseName,
      },
      select: {
        id: true,
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
        },
      });
    }

    return result.id;
  }
}
