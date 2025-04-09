// import { injectable } from "inversify";
// import { IScenarioRepository } from "../../interface/repository/scenario-repository-interface";
// import { IdAndName } from "../../model/model";
// import { drizzleClient } from "../../application/database";
// import { and, eq } from "drizzle-orm";
// import { scenarios } from "../../db/schema";

// @injectable()
// export class ScenarioRepository implements IScenarioRepository {
//   async createOrGetScenarioIdAndName(scenarioName: string, projectId: number): Promise<IdAndName> {
//     let result = await drizzleClient.query.scenarios.findFirst({
//       where: eq(scenarios.name, scenarioName),
//       columns: {
//         id: true,
//         name: true,
//       },
//     });

//     if (!result) {
//       const insertedRecord = await drizzleClient
//         .insert(scenarios)
//         .values({ name: scenarioName, project: projectId })
//         .returning({ id: scenarios.id, name: scenarios.name });

//       return insertedRecord[0];
//     }

//     return result;
//   }

//   async getScenarioIdByScenarioNameAndProjectId(
//     scenarioName: string,
//     projectId: number
//   ): Promise<{ id: number } | null> {
//     const result = await drizzleClient.query.scenarios.findFirst({
//       where: and(eq(scenarios.name, scenarioName), eq(scenarios.project, projectId)),
//       columns: {
//         id: true,
//       },
//     });

//     if (result) {
//       return result;
//     }

//     return null;
//   }
// }
