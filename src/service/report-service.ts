import { inject, injectable } from "inversify";
import { IReportService } from "../interface/service/report-service-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import {
  FileRecordRequest,
  ReportDetailInsertRequest,
  ReportDetailRequest,
  ReportInsertRequest,
  ReportRequest,
} from "../model/model";
import { Validation } from "../validation/validation";
import { ReportValidation } from "../validation/report-validation";
import { AuthUtil } from "../utils/auth-util";
import { TYPES } from "../di/types";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { FileSystem } from "../utils/file-system-util";
import path from "path";
import { container } from "../di/inversify.config";
import { ReportBuilder } from "../application/report-builder";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";
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
    @inject(TYPES.IReportRepository)
    private reportRepository: IReportRepository,
    @inject(TYPES.IReportDetailRepository)
    private reportDetailRepository: IReportDetailRepository,
    @inject(TYPES.IFileRecord) private fileRecordRepository: IFileRecord
  ) {}

  public async createReport(reportRequest: ReportRequest): Promise<string> {
    const validatedRequest = Validation.validate(
      ReportValidation.reportSchema,
      reportRequest
    );

    // Project
    const project = await this.projectRepository.createOrGetProjectIdAndName(
      validatedRequest.project.toUpperCase()
    );

    // Scenario
    const scenario = await this.scenarioRepository.createOrGetScenarioIdAndName(
      validatedRequest.scenario.toUpperCase(),
      project.id
    );

    // TestCase
    const testCase = await this.testCaseRepository.createOrGetTestCaseIdAndName(
      validatedRequest.test_case.toUpperCase(),
      scenario.id
    );

    // Tool
    const toolId = await this.toolRepository.createOrGetToolId(
      validatedRequest.tool
    );

    const reportInsertRequest: ReportInsertRequest = {
      project_id: project.id,
      scenario_id: scenario.id,
      test_case_id: testCase.id,
      tool_id: toolId,
      activity: validatedRequest.activity,
      author: validatedRequest.author,
    };

    const result = await this.reportRepository.createReport(
      reportInsertRequest
    );
    return AuthUtil.signJwt(result);
  }

  public async addTestStep(
    reportDetailRequest: ReportDetailRequest
  ): Promise<void> {
    try {
      Validation.validate(
        ReportValidation.reportDetailSchema,
        reportDetailRequest
      );
    } catch (e: any) {
      const imagePath = process.env.IMAGE_PATH as string;
      await FileSystem.deleteFile(
        path.join(imagePath, reportDetailRequest.image)
      );
      throw e;
    }

    const reportDetailInsertRequest: ReportDetailInsertRequest = {
      report_id: reportDetailRequest.report_id,
      status_id: parseInt(reportDetailRequest.result, 10),
      title: reportDetailRequest.title,
      description: reportDetailRequest.description,
      image: reportDetailRequest.image as string,
    };

    await this.reportDetailRepository.createReportDetail(
      reportDetailInsertRequest
    );
  }

  public async saveReport(reportId: number): Promise<void> {
    const report = await this.reportRepository.getReportById(reportId);
    const reportDetails =
      await this.reportDetailRepository.findAllReportDetailByReportId(reportId);

    if (reportDetails.length < 1) {
      throw new ResponseError(400, "No Step Data Found");
    }

    const reportBuilder = container.get<ReportBuilder>(ReportBuilder);

    const isReportFailed = reportDetails.some(
      (value) => value.status.name === "FAILED"
    );

    const { fileName, date } = await reportBuilder.createReport(
      report,
      reportDetails
    );

    const fileRecordRequest: FileRecordRequest = {
      scenario_id: report.scenario.id,
      test_case_id: report.scenario.id,
      status_id: isReportFailed ? 3 : 2,
      file_name: fileName,
      created_time: date,
    };

    await this.fileRecordRepository.createFileRecord(fileRecordRequest);
    await this.reportDetailRepository.deleteAllReportDetailByReportId(reportId);
    await this.reportRepository.deleteReportById(reportId);

    const imagePath = process.env.IMAGE_PATH as string;
    for (const reportDetail of reportDetails) {
      await FileSystem.deleteFile(path.join(imagePath, reportDetail.image));
    }
  }
}
