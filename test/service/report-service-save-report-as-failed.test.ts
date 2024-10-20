import "reflect-metadata";
import { container } from "../../src/di/inversify.config";
import { TYPES } from "../../src/di/types";
import { IReportBuilder } from "../../src/interface/application/report-builder-interface";
import { IFileRecordRepository } from "../../src/interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../../src/interface/repository/project-repository-interface";
import { IReportDetailRepository } from "../../src/interface/repository/report-detail-repository-interface";
import { IReportRepository } from "../../src/interface/repository/report-repository-interface";
import { IScenarioRepository } from "../../src/interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../../src/interface/repository/testcase-repository-interface";
import { IToolRepository } from "../../src/interface/repository/tool-repository-interface";
import { IReportService } from "../../src/interface/service/report-service-interface";
import { ReportService } from "../../src/service/report-service";
import { FileSystem } from "../../src/utils/file-system-util";
import { MockReportBuilder } from "../mock/application/mock-report-builder";
import { MockFileRecordRepository } from "../mock/repository/mock-file-record-repository";
import { MockProjectRepository } from "../mock/repository/mock-project-repository";
import { MockReportDetailRepository } from "../mock/repository/mock-report-detail-repository";
import { MockReportRepository } from "../mock/repository/mock-report-repository";
import { MockScenarioRepository } from "../mock/repository/mock-scenario-repository";
import { MockTestCaseRepository } from "../mock/repository/mock-test-case-repository";
import { MockToolRepository } from "../mock/repository/mock-tool-repository";
import { ResponseError } from "../../src/error/response-error";

describe("report-service-save-report-as-failed-test", () => {
  let mockDeleteFile: jest.SpyInstance;

  beforeEach(() => {
    container.unbindAll();

    container.bind<IReportBuilder>(TYPES.IReportBuilder).to(MockReportBuilder);
    container
      .bind<IProjectRepository>(TYPES.IProjectRepository)
      .to(MockProjectRepository);
    container
      .bind<IScenarioRepository>(TYPES.IScenarioRepository)
      .to(MockScenarioRepository);
    container
      .bind<ITestCaseRepository>(TYPES.ITestCaseRepository)
      .to(MockTestCaseRepository);
    container
      .bind<IToolRepository>(TYPES.IToolRepository)
      .to(MockToolRepository);
    container
      .bind<IReportRepository>(TYPES.IReportRepository)
      .to(MockReportRepository);
    container
      .bind<IReportDetailRepository>(TYPES.IReportDetailRepository)
      .to(MockReportDetailRepository);
    container
      .bind<IFileRecordRepository>(TYPES.IFileRecordRepository)
      .to(MockFileRecordRepository);

    container.bind<IReportService>(TYPES.IReportService).to(ReportService);

    mockDeleteFile = jest.spyOn(FileSystem, "deleteFile").mockImplementation();
  });

  afterEach(() => {
    mockDeleteFile.mockRestore();
  });

  test("should save report as failed", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const id = 1; // Represent as PASSED report

    await expect(reportService.saveReportAsFailed(id)).resolves.toBeUndefined();
    expect(mockDeleteFile).toHaveBeenCalledTimes(1);
  });

  test("should save report when FAILED step data found in save report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const id = 2; // Represent as FAILED report

    await expect(reportService.saveReportAsFailed(id)).resolves.toBeUndefined();
    expect(mockDeleteFile).toHaveBeenCalledTimes(1);
  });

  test("should save report when step data length < 1 in save report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const id = 3; // Represent as 0 step data

    await expect(reportService.saveReportAsFailed(id)).resolves.toBeUndefined();
    expect(mockDeleteFile).not.toHaveBeenCalledTimes(1);
  });
});
