export const TYPES = {
  // Application Interface
  IReportBuilder: Symbol.for("IReportBuilder"),
  IPlainReportBuilder: Symbol.for("IPlainReportBuilder"),
  // Repository Interface
  IProjectRepository: Symbol.for("IProjectRepository"),
  IScenarioRepository: Symbol.for("IScenarioRepository"),
  ITestCaseRepository: Symbol.for("ITestCaseRepository"),
  IToolRepository: Symbol.for("IToolRepository"),
  IReportRepository: Symbol.for("IReportRepository"),
  ISectionRepository: Symbol.for("ISectionRepository"),
  ITestStepRepository: Symbol.for("ITestStepRepository"),
  ITestStepPlainRepository: Symbol.for("ITestStepPlainRepository"),
  IFileRecordRepository: Symbol.for("IFileRecord"),
  // Service Interface
  IReportService: Symbol.for("IReportService"),
  IWebService: Symbol.for("IWebService"),
};
