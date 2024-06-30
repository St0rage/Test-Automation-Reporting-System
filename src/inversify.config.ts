import { Container } from "inversify";
import { Database } from "./application/database";
import { Logger } from "./application/logger";
import { ReportService } from "./service/report-service";
import { ReportController } from "./controller/report-controller";
import { IReportService } from "./service/interface/report-service-interface";
import { IReportRepository } from "./repository/interface/report-repository-interface";
import { ReportRepository } from "./repository/report-repository";
import { IProjectRepository } from "./repository/interface/project-repository-interface";
import { ProjectRepository } from "./repository/project-repository";
import { IScenarioRepository } from "./repository/interface/scenario-repository-interface";
import { ScenarioRepository } from "./repository/scenario-repository";
import { Web } from "./application/web";
import { ITestCaseRepository } from "./repository/interface/testcase-repository-interface";
import { TestCaseRepository } from "./repository/testcase-repository";
import { IToolRepository } from "./repository/interface/tool-repository-interface";
import { ToolRepository } from "./repository/tool-repository";

const container = new Container();
// Application
container.bind<Logger>(Logger).toSelf().inSingletonScope();
container.bind<Database>(Database).toSelf();
container.bind<Web>(Web).toSelf();
// Repository
container.bind<IProjectRepository>("IProjectRepository").to(ProjectRepository);
container
  .bind<IScenarioRepository>("IScenarioRepository")
  .to(ScenarioRepository);
container
  .bind<ITestCaseRepository>("ITestCaseRepository")
  .to(TestCaseRepository);
container.bind<IToolRepository>("IToolRepository").to(ToolRepository);
container.bind<IReportRepository>("IReportRepository").to(ReportRepository);
// Service
container.bind<IReportService>("IReportService").to(ReportService);
// Controller
container.bind<ReportController>(ReportController).toSelf();

export { container };
