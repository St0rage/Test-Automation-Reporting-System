// import { injectable } from "inversify";
// import { IToolRepository } from "../../interface/repository/tool-repository-interface";
// import { drizzleClient } from "../../application/database";
// import { eq } from "drizzle-orm";
// import { tools } from "../../db/schema";

// @injectable()
// export class ToolRepository implements IToolRepository {
//   async createOrGetToolId(toolName: string): Promise<number> {
//     let result = await drizzleClient.query.tools.findFirst({
//       where: eq(tools.name, toolName),
//       columns: {
//         id: true,
//       },
//     });

//     if (!result) {
//       const insertedRequest = await drizzleClient.insert(tools).values({ name: toolName }).returning({ id: tools.id });
//       return insertedRequest[0].id;
//     }

//     return result.id;
//   }
// }
