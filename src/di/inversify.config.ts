import { Container } from "inversify";
import { Database } from "../application/database";
import { Logger } from "../application/logger";
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
import { Route } from "../route/route";
import { IReportDetailRepository } from "../interface/repository/report-detail-repository-interface";
import { ReportDetail } from "../repository/report-detail-repository";
import { FileHandling } from "../application/multer";
import { IStatusRepository } from "../interface/repository/status-repository-interface";
import { StatusRepository } from "../repository/status-repository";

const container = new Container();
// Application
container.bind<Logger>(Logger).toSelf().inSingletonScope();
container.bind<Database>(Database).toSelf().inSingletonScope();
container.bind<FileHandling>(FileHandling).toSelf();
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
container.bind<IStatusRepository>(TYPES.IStatusRepository).to(StatusRepository);
// Service
container.bind<IReportService>(TYPES.IReportService).to(ReportService);
// Controller
container.bind<ReportController>(ReportController).toSelf();
// Route
container.bind<Route>(Route).toSelf();

export { container };
