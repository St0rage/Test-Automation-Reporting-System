import { Container } from "inversify";
import { ReportBuilder } from "../application/report-builder";
import { IReportBuilder } from "../interface/application/report-builder-interface";
import { IUserRepository } from "../interface/repository/repository-interface";
import { AdminService } from "../service/admin-service";
import { TYPES } from "./types";
import { UserRepository } from "../repository/user-repository";
import { IAdminService } from "../interface/service/service-interface";
import { AdminController } from "../controller/admin-controller";
// import { ProjectRepository } from "../repository/drizzle/project-repository";
// import { ScenarioRepository } from "../repository/drizzle/scenario-repository";
// import { TestCaseRepository } from "../repository/drizzle/testcase-repository";
// import { ToolRepository } from "../repository/drizzle/tool-repository";
// import { ReportRepository } from "../repository/drizzle/report-repository";
// import { ReportDetailRepository } from "../repository/drizzle/report-detail-repository";
// import { FileRecordRepository } from "../repository/drizzle/file-record-repository";

// const container = new Container();
// // Application
// container.bind<IReportBuilder>(TYPES.IReportBuilder).to(ReportBuilder);

// // Repository
// container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
// container.bind<IScenarioRepository>(TYPES.IScenarioRepository).to(ScenarioRepository);
// container.bind<ITestCaseRepository>(TYPES.ITestCaseRepository).to(TestCaseRepository);
// container.bind<IToolRepository>(TYPES.IToolRepository).to(ToolRepository);
// container.bind<IReportRepository>(TYPES.IReportRepository).to(ReportRepository);
// container.bind<IReportDetailRepository>(TYPES.IReportDetailRepository).to(ReportDetailRepository);
// container.bind<IFileRecordRepository>(TYPES.IFileRecordRepository).to(FileRecordRepository);
// // Service
// container.bind<IReportService>(TYPES.IReportService).to(ReportService);
// container.bind<IWebService>(TYPES.IWebService).to(WebService);
// // Controller
// container.bind<ReportController>(ReportController).toSelf();
// container.bind<WebController>(WebController).toSelf();

// const container = new Container();
// // Application
// container.bind<IReportBuilder>(TYPES.IReportBuilder).to(ReportBuilder);

// // Repository
// container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
// container.bind<IScenarioRepository>(TYPES.IScenarioRepository).to(ScenarioRepository);
// container.bind<ITestCaseRepository>(TYPES.ITestCaseRepository).to(TestCaseRepository);
// container.bind<IToolRepository>(TYPES.IToolRepository).to(ToolRepository);
// container.bind<IReportRepository>(TYPES.IReportRepository).to(ReportRepository);
// container.bind<IReportDetailRepository>(TYPES.IReportDetailRepository).to(ReportDetailRepository);
// container.bind<IFileRecordRepository>(TYPES.IFileRecordRepository).to(FileRecordRepository);
// // Service
// container.bind<IReportService>(TYPES.IReportService).to(ReportService);
// container.bind<IWebService>(TYPES.IWebService).to(WebService);
// // Controller
// container.bind<ReportController>(ReportController).toSelf();
// container.bind<WebController>(WebController).toSelf();

const container = new Container();
// Application
container.bind<IReportBuilder>(TYPES.IReportBuilder).to(ReportBuilder);

// Repository
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
// Service
container.bind<IAdminService>(TYPES.IAdminService).to(AdminService);
// Controller
container.bind<AdminController>(AdminController).toSelf();

export { container };
