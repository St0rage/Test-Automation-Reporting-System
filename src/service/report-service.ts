import { inject, injectable } from "inversify";
import path from "path";
import { container } from "../di/inversify.config";
import { TYPES } from "../di/types";
import { ResponseError } from "../error/response-error";
import { IReportBuilder } from "../interface/application/report-builder-interface";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { ITestStepRepository } from "../interface/repository/test-step-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportService } from "../interface/service/report-service-interface";
import {
  FileRecordRequest,
  ImageDetailInsertRequest,
  ImageDetailRequest,
  ProjectInsertRequest,
  ReportInsertRequest,
  ReportRequest,
  SectionInsertRequest,
  SectionRequest,
  TestCaseInsertRequest,
  TestStepInsertRequest,
  TestStepRequest,
} from "../model/model";
import { AuthUtil } from "../utils/auth-util";
import { FileSystem } from "../utils/file-system-util";
import { ReportValidation } from "../validation/report-validation";
import { Validation } from "../validation/validation";
import { ISectionRepository } from "../interface/repository/section-repository-interface";

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
    @inject(TYPES.ISectionRepository) private sectionRepository: ISectionRepository,
    @inject(TYPES.ITestStepRepository)
    private testStepRepository: ITestStepRepository,
    @inject(TYPES.IFileRecordRepository)
    private fileRecordRepository: IFileRecordRepository
  ) {}

  public async createReport(reportRequest: ReportRequest): Promise<string> {
    const validatedRequest = Validation.validate(ReportValidation.reportSchema, reportRequest);

    // Tool
    const toolId = await this.toolRepository.createOrGetToolId(validatedRequest.project.tool);

    // Project
    const projectInsertRequest: ProjectInsertRequest = {
      tool_id: toolId,
      name: validatedRequest.project.name.toUpperCase(),
      platform: validatedRequest.project.platform,
    };

    const project = await this.projectRepository.createOrUpdateProject(projectInsertRequest);

    // Scenario
    const scenario = await this.scenarioRepository.createOrGetScenarioIdAndName(validatedRequest.scenario, project.id);

    // TestCase
    const testCaseInsertRequest: TestCaseInsertRequest = {
      scenario_id: scenario.id,
      name: validatedRequest.test_case.name,
      unique_id: validatedRequest.test_case.unique_id,
      expected_result: validatedRequest.test_case.expected_result,
      criteria: validatedRequest.test_case.criteria,
      description: validatedRequest.test_case.description,
    };

    const testCase = await this.testCaseRepository.createOrUpdateTestCase(testCaseInsertRequest);

    const reportInsertRequest: ReportInsertRequest = {
      project_id: project.id,
      test_case_id: testCase.id,
      activity: validatedRequest.report.activity,
      author: validatedRequest.report.author,
    };

    const result = await this.reportRepository.createReport(reportInsertRequest);
    return AuthUtil.signJwt(result);
  }

  public async addSection(sectionRequest: SectionRequest): Promise<void> {
    Validation.validate(ReportValidation.sectionSchema, sectionRequest);

    const { report_id, name } = sectionRequest;

    const section = await this.sectionRepository.checkLastSection(report_id);

    if (section) {
      const testStep = await this.testStepRepository.checkLastTestStep(section.id);

      if (!testStep) {
        throw new ResponseError(
          400,
          `Cannot create section. Previous section '${section.section_number} ${section.name}' has an empty test step.`
        );
      }

      if (testStep && (!testStep.title || !testStep.description || !testStep.status)) {
        throw new ResponseError(
          400,
          `Cannot create section. Previous section '${section.section_number} ${section.name}' has an empty test step details.(test_step_id: ${testStep.id})`
        );
      }
    }

    const sectionInsertRequest: SectionInsertRequest = {
      report_id,
      name,
      section_number: (section?.section_number ?? 0) + 1,
    };

    await this.sectionRepository.createSection(sectionInsertRequest);
  }

  public async addTestImage(reportId: number, imageDetail: ImageDetailRequest): Promise<{ id: number }> {
    const section = await this.sectionRepository.checkLastSection(reportId);

    if (!section) {
      throw new ResponseError(400, "Cannot add test step image. Section is required.");
    }

    const testStep = await this.testStepRepository.checkLastTestStep(section.id);

    if (testStep && (!testStep.title || !testStep.description || !testStep.status)) {
      throw new ResponseError(400, `There is a test step with empty details. (test_step_id: ${testStep.id})`);
    }

    const imageDetailInsertRequest: ImageDetailInsertRequest = {
      section_id: section.id,
      image: imageDetail.image,
      step_number: (testStep?.step_number ?? 0) + 1, // Prevents NaN issues
    };

    return this.testStepRepository.createImageDetail(imageDetailInsertRequest);
  }

  public async addTestStep(reportId: number, testStepRequest: TestStepRequest): Promise<void> {
    Validation.validate(ReportValidation.testStepSchema, testStepRequest);

    const section = await this.sectionRepository.checkLastSection(reportId);

    if (!section) {
      throw new ResponseError(400, "Cannot add test step detail. Section is required.");
    }

    const testStep = await this.testStepRepository.checkTestStepIsExist(section.id, testStepRequest.test_step_id);

    if (!testStep) {
      throw new ResponseError(400, "test_step_id Not Found");
    }

    if (testStep.title && testStep.description && testStep.status) {
      throw new ResponseError(400, "Test Step is Already Inserted");
    }

    const testStepInsertRequest: TestStepInsertRequest = {
      test_step_id: testStepRequest.test_step_id,
      status_id: testStepRequest.status,
      title: testStepRequest.title,
      description: testStepRequest.description,
    };

    await this.testStepRepository.updateTestStep(testStepInsertRequest);
  }

  public async saveReport(reportId: number, status: boolean): Promise<void> {
    const report = await this.reportRepository.getReportById(reportId);
    const sections = await this.sectionRepository.findAllSectionAndTestStepByReportId(reportId);

    if (sections.length < 1 || sections.some((s) => s.test_steps.length < 1)) {
      throw new ResponseError(400, "No sections or one of the sections has no test steps.");
    }

    const isReportHasNullValue = sections.some((section) =>
      section.test_steps.some((step) => step.title === null || step.description === null || step.status === null)
    );

    if (isReportHasNullValue) {
      throw new ResponseError(400, "There are steps with empty details.");
    }

    if (status) {
      const isReportFailed = sections.some((section) =>
        section.test_steps.some((step) => step.status?.name === "FAILED")
      );

      if (isReportFailed) {
        throw new ResponseError(
          400,
          "One or more steps have a failed status. Please save the report using '/api/save-report-failed'."
        );
      }
    }

    const reportBuilder = container.get<IReportBuilder>(TYPES.IReportBuilder);

    const { fileName, date } = await reportBuilder.createReport(report, sections);

    const fileRecordRequest: FileRecordRequest = {
      test_case_id: report.test_case.id,
      status_id: status ? 2 : 3,
      file_name: fileName,
      created_time: date,
    };

    await this.fileRecordRepository.createFileRecord(fileRecordRequest);
    await this.reportRepository.deleteReportById(reportId);

    const imagePath = process.env.IMAGE_PATH as string;
    for (const section of sections) {
      for (const testStep of section.test_steps) {
        await FileSystem.deleteFile(path.join(imagePath, testStep.image));
      }
    }
  }
}
