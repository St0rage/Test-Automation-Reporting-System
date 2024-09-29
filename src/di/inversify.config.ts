import { Container } from "inversify";
import { ReportService } from "../service/report-service";
import { ReportController } from "../controller/report-controller";
import { IReportService } from "../interface/service/report-service-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { ReportRepository } from "../repository/report-repository";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { ProjectRepository } from "../repository/project-repository";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ScenarioRepository } from "../repository/scenario-repository";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { TestCaseRepository } from "../repository/testcase-repository";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { ToolRepository } from "../repository/tool-repository";
import { TYPES } from "./types";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { ReportDetail } from "../repository/report-detail-repository";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { FileRecordRepository } from "../repository/file-record-repository";
import { IWebService } from "../interface/service/web-service-interface";
import { WebService } from "../service/web-service";
import { WebController } from "../controller/web-controller";
import { ReportBuilder } from "../application/report-builder";

const container = new Container();
// Application
container.bind<ReportBuilder>(ReportBuilder).toSelf();

// Repository
container
  .bind<IProjectRepository>(TYPES.IProjectRepository)
  .to(ProjectRepository);
container
  .bind<IScenarioRepository>(TYPES.IScenarioRepository)
  .to(ScenarioRepository);
container
  .bind<ITestCaseRepository>(TYPES.ITestCaseRepository)
  .to(TestCaseRepository);
container.bind<IToolRepository>(TYPES.IToolRepository).to(ToolRepository);
container.bind<IReportRepository>(TYPES.IReportRepository).to(ReportRepository);
container
  .bind<IReportDetailRepository>(TYPES.IReportDetailRepository)
  .to(ReportDetail);
container
  .bind<IFileRecordRepository>(TYPES.IFileRecordRepository)
  .to(FileRecordRepository);
// Service
container.bind<IReportService>(TYPES.IReportService).to(ReportService);
container.bind<IWebService>(TYPES.IWebService).to(WebService);
// Controller
container.bind<ReportController>(ReportController).toSelf();
container.bind<WebController>(WebController).toSelf();

export { container };
