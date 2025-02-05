// import "reflect-metadata";
// import { container } from "../../src/di/inversify.config";
// import { TYPES } from "../../src/di/types";
// import { IFileRecordRepository } from "../../src/interface/repository/file-record-repository-interface";
// import { IProjectRepository } from "../../src/interface/repository/project-repository-interface";
// import { IReportDetailRepository } from "../../src/interface/repository/report-detail-repository-interface";
// import { IReportRepository } from "../../src/interface/repository/report-repository-interface";
// import { IScenarioRepository } from "../../src/interface/repository/scenario-repository-interface";
// import { ITestCaseRepository } from "../../src/interface/repository/testcase-repository-interface";
// import { IToolRepository } from "../../src/interface/repository/tool-repository-interface";
// import { IReportService } from "../../src/interface/service/report-service-interface";
// import { ReportDetailRequest } from "../../src/model/model";
// import { ReportService } from "../../src/service/report-service";
// import { FileSystem } from "../../src/utils/file-system-util";
// import { MockFileRecordRepository } from "../mock/repository/mock-file-record-repository";
// import { MockProjectRepository } from "../mock/repository/mock-project-repository";
// import { MockReportDetailRepository } from "../mock/repository/mock-report-detail-repository";
// import { MockReportRepository } from "../mock/repository/mock-report-repository";
// import { MockScenarioRepository } from "../mock/repository/mock-scenario-repository";
// import { MockTestCaseRepository } from "../mock/repository/mock-test-case-repository";
// import { MockToolRepository } from "../mock/repository/mock-tool-repository";

// describe("report-service-add-test-step-test", () => {
//   let mockDeleteFile: jest.SpyInstance;

//   beforeEach(() => {
//     container.unbindAll();

//     container
//       .bind<IProjectRepository>(TYPES.IProjectRepository)
//       .to(MockProjectRepository);
//     container
//       .bind<IScenarioRepository>(TYPES.IScenarioRepository)
//       .to(MockScenarioRepository);
//     container
//       .bind<ITestCaseRepository>(TYPES.ITestCaseRepository)
//       .to(MockTestCaseRepository);
//     container
//       .bind<IToolRepository>(TYPES.IToolRepository)
//       .to(MockToolRepository);
//     container
//       .bind<IReportRepository>(TYPES.IReportRepository)
//       .to(MockReportRepository);
//     container
//       .bind<IReportDetailRepository>(TYPES.IReportDetailRepository)
//       .to(MockReportDetailRepository);
//     container
//       .bind<IFileRecordRepository>(TYPES.IFileRecordRepository)
//       .to(MockFileRecordRepository);

//     container.bind<IReportService>(TYPES.IReportService).to(ReportService);

//     mockDeleteFile = jest.spyOn(FileSystem, "deleteFile").mockImplementation();
//   });

//   afterEach(() => {
//     mockDeleteFile.mockRestore();
//   });

//   test("should create test step", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when field empty", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "",
//       description: "",
//       report_id: 1,
//       image: "",
//       result: "",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when title empty", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should create test step when title with 3 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "ttl",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when title less than 3 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "ss",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should create test step when title with 80 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title:
//         "Ini Title Untuk Unit Testing Aplikasi Test Automation Reporting System Versi 1.0",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when title greater than 80 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title:
//         "Ini Title Untuk Unit Testing Aplikasi Test Automation Reporting System Versi 1.0 Prototype",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when description empty", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should create test step when description with 3 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "des",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when description less than 3 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "de",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should create test step when description with 400 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inusysdsswsa",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when description greater than 400 character", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio venenatis.",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test('should create test step when result is "1" ', async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "1",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test('should create test step when result is "2" ', async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "2",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test('should create test step when result is "3" ', async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "3",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).resolves.toBeUndefined();
//     expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
//   });

//   test('should throw error when result less than "1" ', async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "0",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test('should throw error when result greater than "3" ', async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "4",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });

//   test("should throw error when result is not string number ", async () => {
//     const reportService: IReportService =
//       container.resolve<IReportService>(ReportService);

//     const reportDetailInsertRequest: ReportDetailRequest = {
//       title: "testing title",
//       description: "testing description",
//       report_id: 1,
//       image: "testing-image.png",
//       result: "DONE",
//     };

//     await expect(
//       reportService.addTestStep(reportDetailInsertRequest)
//     ).rejects.toThrow();
//     expect(mockDeleteFile).toHaveBeenCalledTimes(1);
//   });
// });

describe("", () => {});
