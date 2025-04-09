export const TYPES = {
  // Application Interface
  IReportBuilder: Symbol.for("IReportBuilder"),
  // Repository Interface
  IProjectRepository: Symbol.for("IProjectRepository"),
  IScenarioRepository: Symbol.for("IScenarioRepository"),
  ITestCaseRepository: Symbol.for("ITestCaseRepository"),
  IToolRepository: Symbol.for("IToolRepository"),
  IReportRepository: Symbol.for("IReportRepository"),
  IReportDetailRepository: Symbol.for("IReportDetailRepository"),
  IFileRecordRepository: Symbol.for("IFileRecord"),
  IUserRepository: Symbol.for("IUserRepository"),
  // Service Interface
  IReportService: Symbol.for("IReportService"),
  IWebService: Symbol.for("IWebService"),
  IUserService: Symbol.for("IUserService"),
  IAdminService: Symbol.for("IAdminService"),
};
