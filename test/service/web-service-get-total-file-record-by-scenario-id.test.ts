import "reflect-metadata";
import { container } from "../../src/di/inversify.config";
import { TYPES } from "../../src/di/types";
import { IFileRecordRepository } from "../../src/interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../../src/interface/repository/project-repository-interface";
import { ITestCaseRepository } from "../../src/interface/repository/testcase-repository-interface";
import { IWebService } from "../../src/interface/service/web-service-interface";
import { WebService } from "../../src/service/web-service";
import { MockFileRecordRepository } from "../mock/repository/mock-file-record-repository";
import { MockProjectRepository } from "../mock/repository/mock-project-repository";
import { MockTestCaseRepository } from "../mock/repository/mock-test-case-repository";

describe("web-service-get-all-file-record-by-scenario-id-test", () => {
  beforeEach(() => {
    container.unbindAll();

    container
      .bind<IProjectRepository>(TYPES.IProjectRepository)
      .to(MockProjectRepository);
    container
      .bind<ITestCaseRepository>(TYPES.ITestCaseRepository)
      .to(MockTestCaseRepository);
    container
      .bind<IFileRecordRepository>(TYPES.IFileRecordRepository)
      .to(MockFileRecordRepository);

    container.bind<IWebService>(TYPES.IWebService).to(WebService);
  });

  test("should get total file record with empty date value", async () => {
    const webService: IWebService = container.resolve<IWebService>(WebService);

    const total = await webService.getTotalFileRecordByScenarioId(
      1,
      "TC_001",
      ""
    );

    expect(total).toBeDefined();
    expect(total).toBe(2);
  });

  test("should get total file record with date value", async () => {
    const webService: IWebService = container.resolve<IWebService>(WebService);

    const total = await webService.getTotalFileRecordByScenarioId(
      1,
      "TC_001",
      "21/10/2024"
    );

    expect(total).toBeDefined();
    expect(total).toBe(1);
  });
});
