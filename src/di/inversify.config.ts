import { Container } from "inversify";
import { ReportBuilder } from "../application/report-builder";
import { ReportController } from "../controller/report-controller";
import { WebController } from "../controller/web-controller";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { IReportRepository } from "../interface/repository/report-repository-interface";
import { IScenarioRepository } from "../interface/repository/scenario-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IToolRepository } from "../interface/repository/tool-repository-interface";
import { IReportService } from "../interface/service/report-service-interface";
import { IWebService } from "../interface/service/web-service-interface";
import { FileRecordRepository } from "../repository/file-record-repository";
import { ProjectRepository } from "../repository/project-repository";
import { ReportDetailRepository } from "../repository/report-detail-repository";
import { ReportRepository } from "../repository/report-repository";
import { ScenarioRepository } from "../repository/scenario-repository";
import { TestCaseRepository } from "../repository/testcase-repository";
import { ToolRepository } from "../repository/tool-repository";
import { ReportService } from "../service/report-service";
import { WebService } from "../service/web-service";
import { TYPES } from "./types";
import { IReportBuilder } from "../interface/application/report-builder-interface";

const container = new Container();
// Application
container.bind<IReportBuilder>(TYPES.IReportBuilder).to(ReportBuilder);

// Repository
container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
container.bind<IScenarioRepository>(TYPES.IScenarioRepository).to(ScenarioRepository);
container.bind<ITestCaseRepository>(TYPES.ITestCaseRepository).to(TestCaseRepository);
container.bind<IToolRepository>(TYPES.IToolRepository).to(ToolRepository);
container.bind<IReportRepository>(TYPES.IReportRepository).to(ReportRepository);
container.bind<IReportDetailRepository>(TYPES.IReportDetailRepository).to(ReportDetailRepository);
container.bind<IFileRecordRepository>(TYPES.IFileRecordRepository).to(FileRecordRepository);
// Service
container.bind<IReportService>(TYPES.IReportService).to(ReportService);
container.bind<IWebService>(TYPES.IWebService).to(WebService);
// Controller
container.bind<ReportController>(ReportController).toSelf();
container.bind<WebController>(WebController).toSelf();

export { container };
