import { inject, injectable } from "inversify";
import { IReportService } from "./interface/report-service-interface";
import { IProjectRepository } from "../repository/interface/project-repository-interface";
import { IScenarioRepository } from "../repository/interface/scenario-repository-interface";
import { ITestCaseRepository } from "../repository/interface/testcase-repository-interface";
import { IToolRepository } from "../repository/interface/tool-repository-interface";
import { IReportRepository } from "../repository/interface/report-repository-interface";
import { ReportInsertRequest, ReportRequest } from "../model/report-model";
import { Validation } from "../validation/validation";
import { ReportValidation } from "../validation/report-validation";

@injectable()
export class ReportService implements IReportService {
  constructor(
    @inject("IProjectRepository") private projectRepository: IProjectRepository,
    @inject("IScenarioRepository")
    private scenarioRepository: IScenarioRepository,
    @inject("ITestCaseRepository")
    private testCaseRepository: ITestCaseRepository,
    @inject("IToolRepository") private toolRepository: IToolRepository,
    @inject("IReportRepository") private reportRepository: IReportRepository
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
      rawRequest.scenario,
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

    return "";
  }

  public saveReport(): void {}
}
