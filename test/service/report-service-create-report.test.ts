import "reflect-metadata";
import { container } from "../../src/di/inversify.config";
import { TYPES } from "../../src/di/types";
import { IFileRecordRepository } from "../../src/interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../../src/interface/repository/project-repository-interface";
import { IReportDetailRepository } from "../../src/interface/repository/report-detail-repository-interface";
import { IReportRepository } from "../../src/interface/repository/report-repository-interface";
import { IScenarioRepository } from "../../src/interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../../src/interface/repository/testcase-repository-interface";
import { IToolRepository } from "../../src/interface/repository/tool-repository-interface";
import { IReportService } from "../../src/interface/service/report-service-interface";
import { ReportRequest } from "../../src/model/model";
import { ReportService } from "../../src/service/report-service";
import { MockFileRecordRepository } from "../mock/mock-file-record-repository";
import { MockProjectRepository } from "../mock/mock-project-repository";
import { MockReportDetailRepository } from "../mock/mock-report-detail-repository";
import { MockReportRepository } from "../mock/mock-report-repository";
import { MockScenarioRepository } from "../mock/mock-scenario-repository";
import { MockTestCaseRepository } from "../mock/mock-test-case-repository";
import { MockToolRepository } from "../mock/mock-tool-repository";

describe("report-service-create-report-test", () => {
  beforeEach(() => {
    container.unbindAll();

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
  });

  test("should create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when field empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "",
      scenario: "",
      test_case: "",
      activity: "",
      tool: "",
      author: "",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when project name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when project name with 3 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "AAA",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when project name less than 3 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "aa",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when project name with 50 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "PROJECT-NAME-WITH-50-CHARACTERS-THEN-SHOULD-PASSED",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when project name greater than 50 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "PROJECT-NAME-WITH-GREATER-THEN-50-CHARACTER-SHOULD-FAILED",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when scenario name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when scenario name with 2 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SS",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when scenario name less than 2 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "S",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when scenario name with 100 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario:
        "SCN-WITH-100-CHARACTERS-SHOULD-BE-PASSED-AND-SENDING-TOKEN-TO-CLIENT-BY-CONTROLLER-WITH-JSON-RESPONS",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when scenario name greater than 100 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario:
        "SCN-WITH-GREATER-100-CHARACTERS-SHOULD-BE-FAILED-AND-THROW-ERROR-SENDING-ERROR-MESSAGE-CATCHED-BY-ERROR-MIDDLEWARE",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when test_case name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when activity name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when activity name with 3 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "ACT",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when activity name less than 3 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "AC",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when activity name with 50 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "ACTIVITY-NAME-SHOULD-BE-PASSED-WITH-50-CHARACTERSS",
      tool: "Selenium",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when activity name greater than 50 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity:
        "ACTIVITY-NAME-SHOULD-BE-FAILED-AND-THROW-ERROR-WHEN-GREATER-THAN-50-CHARACTERS",
      tool: "Selenium",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when tool name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when tool name with 3 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "TTT",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when tool name less than 3 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "TT",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when tool name with 50 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "TOOL-NAME-SHOULD-BE-PASSD-WITH-50-CHARACTERSSSSSSS",
      author: "Anonymous2",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when tool name greater than 50 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "TOOL-NAME-SHOULD-BE-FAILED-WHEN-GREATER-THAN-50-CHARACTERS",
      author: "Anonymous2",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should throw error when author name empty in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when author name with 3 char", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "AUT",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when author name less than 3 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "AU",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  test("should create report when author name with 50 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author: "AUTHOR-NAME-SHOULD-PASSED-WITH-50-CHARACTERSSSSSSS",
    };

    expect(await reportService.createReport(reportRequest)).toBeDefined();
  });

  test("should throw error when author name greater than 50 char in create report", async () => {
    const reportService: IReportService =
      container.resolve<IReportService>(ReportService);

    const reportRequest: ReportRequest = {
      project: "DUMMY-PROJECT",
      scenario: "SCN-DMY",
      test_case: "DMY-001",
      activity: "Scripting Test Report",
      tool: "Selenium",
      author:
        "AUTHOR-NAME-SHOULD-FAILED-AND-THROW-ERROR-WHEN-GREATER-THAN-50-CHARACTERS",
    };

    await expect(reportService.createReport(reportRequest)).rejects.toThrow();
  });

  // ADD TEST STEP
  // test("should create test step", async () => {
  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title: "testing title",
  //     description: "testing description",
  //     report_id: 1,
  //     image: "testing-image.png",
  //     result: "1",
  //   };

  //   await reportService.addTestStep(reportDetailInsertRequest);
  // });

  // test("should throw error when field empty", async () => {
  //   const mockDeleteFile = jest
  //     .spyOn(FileSystem, "deleteFile")
  //     .mockImplementation();

  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title: "",
  //     description: "",
  //     report_id: 1,
  //     image: "",
  //     result: "",
  //   };

  //   await expect(
  //     reportService.addTestStep(reportDetailInsertRequest)
  //   ).rejects.toThrow();
  //   expect(mockDeleteFile).toHaveBeenCalled();
  // });

  // test("should throw error when title empty", async () => {
  //   const mockDeleteFile = jest
  //     .spyOn(FileSystem, "deleteFile")
  //     .mockImplementation();

  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title: "",
  //     description: "testing description",
  //     report_id: 1,
  //     image: "testing-image.png",
  //     result: "1",
  //   };

  //   await expect(
  //     reportService.addTestStep(reportDetailInsertRequest)
  //   ).rejects.toThrow();
  //   expect(mockDeleteFile).toHaveBeenCalled();
  // });

  // test("should throw error when title less than 3 character", async () => {
  //   const mockDeleteFile = jest
  //     .spyOn(FileSystem, "deleteFile")
  //     .mockImplementation();

  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title: "ss",
  //     description: "testing description",
  //     report_id: 1,
  //     image: "testing-image.png",
  //     result: "1",
  //   };

  //   await expect(
  //     reportService.addTestStep(reportDetailInsertRequest)
  //   ).rejects.toThrow();
  //   expect(mockDeleteFile).toHaveBeenCalled();
  // });

  // test("should throw error when title greater than 80 character", async () => {
  //   const mockDeleteFile = jest
  //     .spyOn(FileSystem, "deleteFile")
  //     .mockImplementation();

  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title:
  //       "Ini Title Untuk Unit Testing Aplikasi Test Automation Reporting System Versi 1.0 Prototype",
  //     description: "testing description",
  //     report_id: 1,
  //     image: "testing-image.png",
  //     result: "1",
  //   };

  //   await expect(
  //     reportService.addTestStep(reportDetailInsertRequest)
  //   ).rejects.toThrow();
  //   expect(mockDeleteFile).toHaveBeenCalled();
  // });

  // test("should throw error when description empty", async () => {
  //   const mockDeleteFile = jest
  //     .spyOn(FileSystem, "deleteFile")
  //     .mockImplementation();

  //   const reportService: IReportService =
  //     container.resolve<IReportService>(ReportService);

  //   const reportDetailInsertRequest: ReportDetailRequest = {
  //     title: "testing title",
  //     description: "",
  //     report_id: 1,
  //     image: "testing-image.png",
  //     result: "1",
  //   };

  //   await expect(
  //     reportService.addTestStep(reportDetailInsertRequest)
  //   ).rejects.toThrow();
  //   expect(mockDeleteFile).toHaveBeenCalled();
  // });
});
