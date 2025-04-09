// import { eq } from "drizzle-orm";
// import { injectable } from "inversify";
// import { drizzleClient } from "../../application/database";
// import { projects } from "../../db/schema";
// import { IProjectRepository } from "../../interface/repository/project-repository-interface";
// import { IdAndName, ProjectScenarioResponse } from "../../model/model";

// @injectable()
// export class ProjectRepository implements IProjectRepository {
//   async createOrGetProjectIdAndName(projectName: string): Promise<IdAndName> {
//     let result = await drizzleClient.query.projects.findFirst({
//       where: eq(projects.name, projectName),
//       columns: {
//         id: true,
//         name: true,
//       },
//     });

//     if (!result) {
//       const insertedRecord = await drizzleClient
//         .insert(projects)
//         .values({ name: projectName })
//         .returning({ id: projects.id, name: projects.name });
//       return insertedRecord[0];
//     }

//     return result;
//   }

//   async findAllProjectAndScenario(): Promise<ProjectScenarioResponse[]> {
//     return drizzleClient.query.projects.findMany({
//       columns: {
//         id: true,
//         name: true,
//       },
//       with: {
//         scenarios: {
//           columns: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//     });
//   }

//   async getProjectIdByProjectName(projectName: string): Promise<{ id: number } | null> {
//     const result = await drizzleClient.query.projects.findFirst({
//       where: eq(projects.name, projectName),
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
