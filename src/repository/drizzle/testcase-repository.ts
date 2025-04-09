// import { and, eq } from "drizzle-orm";
// import { injectable } from "inversify";
// import { drizzleClient } from "../../application/database";
// import { testcases } from "../../db/schema";
// import { ITestCaseRepository } from "../../interface/repository/testcase-repository-interface";
// import { IdAndName } from "../../model/model";

// @injectable()
// export class TestCaseRepository implements ITestCaseRepository {
//   async createOrGetTestCaseIdAndName(testCaseName: string, scenarioId: number): Promise<IdAndName> {
//     let result = await drizzleClient.query.testcases.findFirst({
//       where: and(eq(testcases.scenario, scenarioId), eq(testcases.name, testCaseName)),
//       columns: {
//         id: true,
//         name: true,
//       },
//     });

//     if (!result) {
//       const insertedRecord = await drizzleClient
//         .insert(testcases)
//         .values({ scenario: scenarioId, name: testCaseName })
//         .returning({ id: testcases.id, name: testcases.name });

//       return insertedRecord[0];
//     }

//     return result;
//   }

//   findAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndName[]> {
//     return drizzleClient.query.testcases.findMany({
//       where: eq(testcases.scenario, scenarioId),
//       columns: {
//         id: true,
//         name: true,
//       },
//     });
//   }
// }
