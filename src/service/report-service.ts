import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import {
  ReportDetailInsertRequest,
  ReportDetailRequest,
  ReportInsertRequest,
  ReportRequest,
} from "../model/model";
import { Validation } from "../validation/validation";
import { ReportValidation } from "../validation/report-validation";
import { AuthUtil } from "../utils/auth-util";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { IStatusRepository } from "../interface/repository/status-repository-interface";
import { rmSync } from "fs";

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
    @inject(TYPES.IReportRepository)
    private reportRepository: IReportRepository,
    @inject(TYPES.IReportDetailRepository)
    private reportDetailRepository: IReportDetailRepository,
    @inject(TYPES.IStatusRepository) private statusRepository: IStatusRepository
  ) {}

  public async createReport(reportRequest: ReportRequest): Promise<string> {
    const rawRequest = Validation.validate(
      ReportValidation.reportSchema,
      reportRequest
    );

    // Project
    const project = await this.projectRepository.createOrGetProjectIdAndName(
      rawRequest.project
    );

    // Scenario
    const scenario = await this.scenarioRepository.createOrGetScenarioIdAndName(
      rawRequest.scenario,
      project.id
    );

    // TestCase
    const testCase = await this.testCaseRepository.createOrGetTestCaseIdAndName(
      rawRequest.test_case,
      scenario.id
    );

    // Tool
    const toolId = await this.toolRepository.createOrGetToolId(rawRequest.tool);

    const reportInsertRequest: ReportInsertRequest = {
      project_id: project.id,
      scenario_id: scenario.id,
      test_case_id: testCase.id,
      tool_id: toolId,
      author: rawRequest.author,
    };

    const result = await this.reportRepository.createReport(
      reportInsertRequest
    );
    return AuthUtil.signJwt(result);
  }

  public async addTestStep(
    reportDetailRequest: ReportDetailRequest
  ): Promise<void> {
    const isReportExist = await this.reportRepository.checkReportIsExist(
      reportDetailRequest.report_id
    );

    if (!isReportExist) {
      throw new ResponseError(401, "Unauthorized");
    }

    const rawRequest = Validation.validate(
      ReportValidation.reportDetailSchema,
      reportDetailRequest
    );

    const status = await this.statusRepository.getStatusId(rawRequest.result);

    const reportDetailInsertRequest: ReportDetailInsertRequest = {
      report_id: reportDetailRequest.report_id,
      status_id: status.id,
      title: rawRequest.title,
      description: rawRequest.description,
      image: reportDetailRequest.image as string,
    };

    await this.reportDetailRepository.createReportDetail(
      reportDetailInsertRequest
    );
  }

  public async saveReport(): Promise<void> {}
}
