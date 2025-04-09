// import { injectable } from "inversify";
// import { IFileRecordRepository } from "../../interface/repository/file-record-repository-interface";
// import { FileRecordRequest, FileRecordResponse } from "../../model/model";
// import { drizzleClient } from "../../application/database";
// import { fileRecords, scenarios, testcases } from "../../db/schema";
// import { and, count, desc, eq, gt, gte, lt, lte } from "drizzle-orm";

// @injectable()
// export class FileRecordRepository implements IFileRecordRepository {
//   async createFileRecord(fileRecord: FileRecordRequest): Promise<void> {
//     await drizzleClient.insert(fileRecords).values({
//       fileName: fileRecord.file_name,
//       scenario: fileRecord.scenario_id,
//       testcase: fileRecord.test_case_id,
//       status: fileRecord.status_id,
//       createdTime: fileRecord.created_time,
//     });
//   }

//   async findAllFileRecordByScenarioId(
//     scenarioId: number,
//     pageSize: number,
//     page: number,
//     testCase?: string,
//     startDate?: number,
//     endDate?: number
//   ): Promise<FileRecordResponse[]> {
//     const result = await drizzleClient.query.fileRecords.findMany({
//       where: and(
//         eq(fileRecords.scenario, scenarioId),
//         testCase ? eq(testcases.name, testCase) : undefined,
//         startDate ? gte(fileRecords.createdTime, startDate) : undefined,
//         endDate ? lte(fileRecords.createdTime, endDate) : undefined
//       ),
//       columns: {
//         id: true,
//         fileName: true,
//         createdTime: true,
//       },
//       with: {
//         status: {
//           columns: {
//             name: true,
//           },
//         },
//         testcase: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//       orderBy: desc(fileRecords.id),
//       limit: pageSize,
//       offset: (page - 1) * pageSize,
//     });

//     return result.map((row) => ({
//       id: row.id,
//       file_name: row.fileName,
//       test_case: row.testcase,
//       status: row.status,
//       created_time: row.createdTime,
//     }));
//   }

//   async countTotalFileRecordByScenarioId(
//     scenarioId: number,
//     testCase?: string,
//     startDate?: number,
//     endDate?: number
//   ): Promise<number> {
//     const rowCount = await drizzleClient
//       .select({ count: count() })
//       .from(fileRecords)
//       .where(
//         and(
//           eq(fileRecords.scenario, scenarioId),
//           testCase ? eq(testcases.name, testCase) : undefined,
//           startDate ? gte(fileRecords.createdTime, startDate) : undefined,
//           endDate ? lte(fileRecords.createdTime, endDate) : undefined
//         )
//       );

//     return rowCount[0].count;
//   }

//   async checkFileRecordIsExist(id: number): Promise<string | null> {
//     const result = await drizzleClient.query.fileRecords.findFirst({
//       where: eq(fileRecords.id, id),
//       columns: {
//         fileName: true,
//       },
//     });

//     if (result) {
//       return result.fileName;
//     }

//     return null;
//   }

//   async deleteFileRecordById(id: number): Promise<string> {
//     const result = await drizzleClient
//       .delete(fileRecords)
//       .where(eq(fileRecords.id, id))
//       .returning({ fileName: fileRecords.fileName });

//     return result[0].fileName;
//   }
// }
