import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { WebService } from "../service/web-service";
import { exRequest } from "../type/exrequest";
import { NextFunction, Response } from "express";

@injectable()
export class WebController {
  constructor(@inject(TYPES.IWebService) private webService: WebService) {}

  async getDashboardData(
    req: exRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projects = await this.webService.getAllProjectAndScenario();

      res.render("page/dashboard", {
        projects: projects,
        activeProject: "dashboard",
        activeScenario: "",
      });
    } catch (e) {
      next(e);
    }
  }

  async getReportData(
    req: exRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectName = req.projectName;
      const scenarioName = req.scenarioName;
      const pageString: string = req.query.page as string;
      const pageNumber: number = parseInt(pageString);

      const projects = await this.webService.getAllProjectAndScenario();
      const testCases = await this.webService.getAllTestCaseByScenarioName(
        scenarioName as string
      );
      const fileRecords = await this.webService.getAllFileRecordByScenarioName(
        scenarioName as string,
        pageNumber
      );
      const totalFileRecords =
        await this.webService.getTotalFileRecordByScenarioName(
          scenarioName as string
        );

      res.render("page/report", {
        projects: projects,
        testCases: testCases,
        fileRecords: fileRecords,
        projectName: projectName,
        scenarioName: scenarioName,
        activeProject: projectName,
        activeScenario: scenarioName,
        page: pageNumber,
        totalFileRecords: totalFileRecords,
      });
    } catch (e) {
      next(e);
    }
  }
}
