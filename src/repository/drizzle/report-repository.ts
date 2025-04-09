// import { injectable } from "inversify";
// import { IReportRepository } from "../../interface/repository/report-repository-interface";
// import { ReportInsertRequest, ReportResponse } from "../../model/model";
// import { drizzleClient } from "../../application/database";
// import { reports } from "../../db/schema";
// import { count, eq } from "drizzle-orm";

// @injectable()
// export class ReportRepository implements IReportRepository {
//   async createReport(reportInsertRequest: ReportInsertRequest): Promise<{ id: number }> {
//     const result = await drizzleClient
//       .insert(reports)
//       .values({
//         project: reportInsertRequest.project_id,
//         scenario: reportInsertRequest.scenario_id,
//         testcase: reportInsertRequest.test_case_id,
//         activity: reportInsertRequest.activity,
//         author: reportInsertRequest.author,
//         tool: reportInsertRequest.tool_id,
//       })
//       .returning({ id: reports.id });

//     return result[0];
//   }

//   async checkReportIsExist(id: number): Promise<Boolean> {
//     const rowCount = await drizzleClient.select({ count: count() }).from(reports).where(eq(reports.id, id));

//     if (rowCount[0].count != 1) {
//       return false;
//     }

//     return true;
//   }

//   async getReportById(id: number): Promise<ReportResponse> {
//     const report = await drizzleClient.query.reports.findFirst({
//       where: eq(reports.id, id),
//       with: {
//         project: {
//           columns: {
//             name: true,
//           },
//         },
//         scenario: {
//           columns: {
//             id: true,
//             name: true,
//           },
//         },
//         testcase: {
//           columns: {
//             id: true,
//             name: true,
//           },
//         },
//         tool: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//       columns: {
//         activity: true,
//         author: true,
//       },
//     });

//     return {
//       project: report?.project as { name: string },
//       scenario: report?.scenario as { id: number; name: string },
//       test_case: report?.testcase as { id: number; name: string },
//       tool: report?.tool as { name: string },
//       activity: report?.activity as string,
//       author: report?.author as string,
//     };
//   }

//   async deleteReportById(id: number): Promise<void> {
//     await drizzleClient.delete(reports).where(eq(reports.id, id));
//   }
// }
