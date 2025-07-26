import { Container } from "inversify";
import { ReportBuilder } from "../application/report-builder";
import { IReportBuilder } from "../interface/application/report-builder-interface";
import {
  IModuleRepository,
  IProjectRepository,
  ITeamRepository,
  IToolRepository,
  IUserRepository,
  IUserTeamRepository,
} from "../interface/repository/repository-interface";
import { AdminService } from "../service/admin-service";
import { TYPES } from "./types";
import { UserRepository } from "../repository/user-repository";
import { IAdminService, IModuleService, IProjectService } from "../interface/service/service-interface";
import { AdminController } from "../controller/admin-controller";
import { TeamRepository } from "../repository/team-repository";
import { UserTeamRepository } from "../repository/user-team-repository";
import { ToolRepository } from "../repository/tool-repository";
import { ProjectRepository } from "../repository/project-repository";
import { ProjectController } from "../controller/project-controller";
import { ProjectService } from "../service/project-service";
import { ModuleRepository } from "../repository/module-repository";
import { ModuleService } from "../service/module-service";
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
container.bind<ITeamRepository>(TYPES.ITeamRepository).to(TeamRepository);
container.bind<IUserTeamRepository>(TYPES.IUserTeamRepository).to(UserTeamRepository);
container.bind<IToolRepository>(TYPES.IToolRepository).to(ToolRepository);
container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
container.bind<IModuleRepository>(TYPES.IModuleRepository).to(ModuleRepository);
// Service
container.bind<IAdminService>(TYPES.IAdminService).to(AdminService);
container.bind<IProjectService>(TYPES.IProjectService).to(ProjectService);
container.bind<IModuleService>(TYPES.IModuleService).to(ModuleService);
// Controller
container.bind<AdminController>(AdminController).toSelf();
container.bind<ProjectController>(ProjectController).toSelf();

export { container };
