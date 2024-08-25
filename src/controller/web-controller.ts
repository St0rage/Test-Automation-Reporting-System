import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import path from "path";
import { TYPES } from "../di/types";
import { WebService } from "../service/web-service";

@injectable()
export class WebController {
  constructor(@inject(TYPES.IWebService) private webService: WebService) {}

  async getDashboardData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projects = await this.webService.getAllProjectAndScenario();

      res.status(200).render("page/dashboard", {
        projects: projects,
        activeProject: "dashboard",
        activeScenario: "",
      });
    } catch (e) {
      next(e);
    }
  }

  async getReportData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectName = res.locals.projectName;
      const scenarioName = res.locals.scenarioName;
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

      res.status(200).render("page/report", {
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

  downloadReport(req: Request, res: Response, next: NextFunction): void {
    try {
      const originalFileName = res.locals.fileName;
      const reportPath = process.env.REPORT_PATH as string;
      const filePath = path.join(reportPath, originalFileName);

      res.status(200).download(filePath, originalFileName, (err) => {
        if (err) {
          next(err);
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async settings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projects = await this.webService.getAllProjectAndScenario();

      const reportLogoError = req.flash("error-logo") || "";

      if (reportLogoError[0] === "" || reportLogoError[0] === undefined) {
        res.status(200).render("page/setting", {
          projects: projects,
          activeProject: "",
          activeScenario: "",
          reportLogoError: "",
        });
      } else {
        res.status(400).render("page/setting", {
          projects: projects,
          activeProject: "",
          activeScenario: "",
          reportLogoError: reportLogoError[0],
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async changeReportLogo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const message = await this.webService.validateReportLogo();
      req.flash("error-logo", message);
      return res.redirect("/settings");
    } catch (e) {
      next(e);
    }
  }
}
