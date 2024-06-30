"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const database_1 = require("./application/database");
const logger_1 = require("./application/logger");
const report_service_1 = require("./service/report-service");
const report_controller_1 = require("./controller/report-controller");
const report_repository_1 = require("./repository/report-repository");
const project_repository_1 = require("./repository/project-repository");
const scenario_repository_1 = require("./repository/scenario-repository");
const web_1 = require("./application/web");
const testcase_repository_1 = require("./repository/testcase-repository");
const tool_repository_1 = require("./repository/tool-repository");
const container = new inversify_1.Container();
exports.container = container;
// Application
container.bind(logger_1.Logger).toSelf().inSingletonScope();
container.bind(database_1.Database).toSelf();
container.bind(web_1.Web).toSelf();
// Repository
container.bind("IProjectRepository").to(project_repository_1.ProjectRepository);
container
    .bind("IScenarioRepository")
    .to(scenario_repository_1.ScenarioRepository);
container
    .bind("ITestCaseRepository")
    .to(testcase_repository_1.TestCaseRepository);
container.bind("IToolRepository").to(tool_repository_1.ToolRepository);
container.bind("IReportRepository").to(report_repository_1.ReportRepository);
// Service
container.bind("IReportService").to(report_service_1.ReportService);
// Controller
container.bind(report_controller_1.ReportController).toSelf();
