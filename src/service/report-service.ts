import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { ReportInsertRequest, ReportRequest } from "../model/report-model";
import { Validation } from "../validation/validation";
import { ReportValidation } from "../validation/report-validation";
import { AuthUtil } from "../utils/auth-util";
import { TYPES } from "../di/types";

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

    const projectId = await this.projectRepository.createOrGetProjectId(
      rawRequest.project
    );

    const scenarioId = await this.scenarioRepository.createOrGetScenarioId(
      rawRequest.scenario,
      projectId
    );

    const testCaseId = await this.testCaseRepository.createOrGetTestCaseId(
      rawRequest.test_case,
      scenarioId
    );

    const toolId = await this.toolRepository.createOrGetToolId(rawRequest.tool);

    const reportInserRequest: ReportInsertRequest = {
      project_id: projectId,
      scenario_id: scenarioId,
      test_case_id: testCaseId,
      tool_id: toolId,
      author: rawRequest.author,
    };

    const result = await this.reportRepository.createReport(reportInserRequest);
    return AuthUtil.signJwt(result);
  }

  public saveReport(): void {}
}
