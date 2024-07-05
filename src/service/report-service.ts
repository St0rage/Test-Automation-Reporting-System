import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { ReportInsertRequest, ReportRequest } from "../model/model";
import { Validation } from "../validation/validation";
import { ReportValidation } from "../validation/report-validation";
import { AuthUtil } from "../utils/auth-util";
import { TYPES } from "../di/types";
import { FileSystem } from "../utils/file-system-uti";
import { ResponseError } from "../error/response-error";

@injectable()
export class ReportService implements IReportService {
  constructor(
    @inject(TYPES.IProjectRepository)
    private projectRepository: IProjectRepository,
    @inject(TYPES.IScenarioRepository)
    private scenarioRepository: IScenarioRepository,
    @inject(TYPES.ITestCaseRepository)
    private testCaseRepository: ITestCaseRepository,
    @inject(TYPES.IToolRepository) private toolRepository: IToolRepository,
    @inject(TYPES.IReportRepository) private reportRepository: IReportRepository
  ) {}

  public async createReport(reportRequest: ReportRequest): Promise<string> {
    const rawRequest = Validation.validate(
      ReportValidation.reportSchema,
      reportRequest
    );

    const imagePath = process.env.IMAGE_PATH;
    if (!imagePath) {
      throw new ResponseError(500, "Internal Server Error");
    }
    const reportPath = process.env.REPORT_PATH;
    if (!reportPath) {
      throw new ResponseError(500, "Internal Server Error");
    }

    // Project
    const project = await this.projectRepository.createOrGetProjectIdAndName(
      rawRequest.project
    );

    // Create Project Folder
    try {
      await FileSystem.createFolder(imagePath + `/${project.name}`);
      await FileSystem.createFolder(reportPath + `/${project.name}`);
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error");
    }

    // Scenario
    const scenario = await this.scenarioRepository.createOrGetScenarioIdAndName(
      rawRequest.scenario,
      project.id
    );

    // Create Scenario Folder
    try {
      await FileSystem.createFolder(
        imagePath + `/${project.name}/${scenario.name}`
      );
      await FileSystem.createFolder(
        reportPath + `/${project.name}/${scenario.name}`
      );
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error");
    }

    // TestCase
    const testCase = await this.testCaseRepository.createOrGetTestCaseIdAndName(
      rawRequest.test_case,
      scenario.id
    );

    // Create Folder TestCase
    try {
      await FileSystem.createFolder(
        imagePath + `/${project.name}/${scenario.name}/${testCase.name}`
      );
    } catch (e) {
      throw new ResponseError(500, "Internal Server Error");
    }

    // Tool
    const toolId = await this.toolRepository.createOrGetToolId(rawRequest.tool);

    const reportInserRequest: ReportInsertRequest = {
      project_id: project.id,
      scenario_id: scenario.id,
      test_case_id: testCase.id,
      tool_id: toolId,
      author: rawRequest.author,
    };

    const result = await this.reportRepository.createReport(reportInserRequest);
    return AuthUtil.signJwt(result);
  }

  public async addTestStep(): Promise<void> {}

  public async saveReport(): Promise<void> {}
}
