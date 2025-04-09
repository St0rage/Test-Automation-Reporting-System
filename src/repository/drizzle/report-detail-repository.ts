// import { injectable } from "inversify";
// import { IReportDetailRepository } from "../../interface/repository/report-detail-repository-interface";
// import {
//   ImageDetailInsertRequest,
//   ReportDetailInsertRequest,
//   ReportDetailResponse,
//   ReportDetailResponseWithId,
// } from "../../model/model";
// import { drizzleClient } from "../../application/database";
// import { reportDetails } from "../../db/schema";
// import { and, asc, desc, eq } from "drizzle-orm";

// @injectable()
// export class ReportDetailRepository implements IReportDetailRepository {
//   async createImageDetail(imageDetail: ImageDetailInsertRequest): Promise<{ id: number }> {
//     const result = await drizzleClient
//       .insert(reportDetails)
//       .values({ report: imageDetail.report_id, stepNumber: imageDetail.step_number, image: imageDetail.image })
//       .returning({ id: reportDetails.id });

//     return result[0];
//   }

//   async checkLastReportDetail(reportId: number): Promise<ReportDetailResponseWithId | null> {
//     const result = await drizzleClient.query.reportDetails.findFirst({
//       orderBy: desc(reportDetails.id),
//       where: eq(reportDetails.report, reportId),
//       columns: {
//         id: true,
//         stepNumber: true,
//         title: true,
//         description: true,
//         image: true,
//       },
//       with: {
//         status: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//     });

//     if (result) {
//       return {
//         id: result.id,
//         step_number: result.stepNumber,
//         title: result.title,
//         description: result.description,
//         image: result.image,
//         status: result.status,
//       };
//     }

//     return null;
//   }

//   async updateReportDetail(reportDetail: ReportDetailInsertRequest): Promise<void> {
//     await drizzleClient
//       .update(reportDetails)
//       .set({
//         title: reportDetail.title,
//         description: reportDetail.description,
//         status: reportDetail.status_id,
//       })
//       .where(and(eq(reportDetails.report, reportDetail.report_id), eq(reportDetails.id, reportDetail.detail_id)));
//   }

//   async checkReportDetailIsExist(reportId: number, detailId: number): Promise<ReportDetailResponse | null> {
//     const result = await drizzleClient.query.reportDetails.findFirst({
//       where: and(eq(reportDetails.report, reportId), eq(reportDetails.id, detailId)),
//       orderBy: asc(reportDetails.stepNumber),
//       columns: {
//         stepNumber: true,
//         title: true,
//         description: true,
//         image: true,
//       },
//       with: {
//         status: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//     });

//     if (result) {
//       return {
//         title: result.title,
//         description: result.title,
//         status: result.status,
//         image: result.image,
//         step_number: result.stepNumber,
//       };
//     }

//     return null;
//   }

//   async findAllReportDetailByReportId(reportId: number): Promise<ReportDetailResponse[]> {
//     const result = await drizzleClient.query.reportDetails.findMany({
//       where: eq(reportDetails.report, reportId),
//       columns: {
//         stepNumber: true,
//         title: true,
//         description: true,
//         image: true,
//       },
//       with: {
//         status: {
//           columns: {
//             name: true,
//           },
//         },
//       },
//       orderBy: asc(reportDetails.stepNumber),
//     });

//     return result.map((row) => ({
//       step_number: row.stepNumber,
//       title: row.title,
//       description: row.description,
//       image: row.image,
//       status: row.status,
//     }));
//   }

//   async deleteAllReportDetailByReportId(reportId: number): Promise<void> {
//     await drizzleClient.delete(reportDetails).where(eq(reportDetails.report, reportId));
//   }
// }
