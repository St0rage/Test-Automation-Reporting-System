import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import path from "path";
import { TYPES } from "../di/types";
import { IWebService } from "../interface/service/web-service-interface";

@injectable()
export class WebController {
  constructor(@inject(TYPES.IWebService) private webService: IWebService) {}

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
      const projectName = res.locals.projectName as string;
      const scenarioName = res.locals.scenarioName as string;
      const scenarioId = res.locals.scenarioId as number;
      const pageString: string = req.query.page as string;
      const pageNumber: number = parseInt(pageString);
      const testCaseQuery: string = res.locals.testCase as string;
      const date: string = res.locals.date as string;
      const pageSize: number = 10;

      const projects = await this.webService.getAllProjectAndScenario();
      const testCases = await this.webService.getAllTestCaseByScenarioId(
        scenarioId
      );
      const fileRecords = await this.webService.getAllFileRecordByScenarioId(
        scenarioId,
        pageSize,
        pageNumber,
        testCaseQuery,
        date
      );

      const totalFileRecords =
        await this.webService.getTotalFileRecordByScenarioId(
          scenarioId,
          testCaseQuery,
          date
        );

      res.status(200).render("page/report", {
        projects: projects,
        testCases: testCases,
        fileRecords: fileRecords,
        projectName: projectName,
        scenarioName: scenarioName,
        activeProject: projectName,
        activeScenario: scenarioId,
        page: pageNumber,
        totalFileRecords: totalFileRecords,
        dateFilter: date,
        testCaseQuery: testCaseQuery,
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
      const reportLogoError = req.flash("error-logo") || "";
      const projects = await this.webService.getAllProjectAndScenario();

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

  async deleteFileRecord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fileRecordId = res.locals.fileRecordId as number;
      const { projectName, scenarioName, page, test_case, date, length } =
        req.body;

      await this.webService.deleteFileRecordById(fileRecordId);

      let baseUrl = `/${projectName.toLowerCase()}/${scenarioName.toLowerCase()}`;

      if (parseInt(length) === 1) {
        baseUrl += `?page=${parseInt(page) !== 1 ? parseInt(page) - 1 : page}`;
      } else {
        baseUrl += `?page=${page}`;
      }

      if (test_case) {
        baseUrl += `&test_case=${test_case}`;
      }

      if (date) {
        baseUrl += `&date=${encodeURIComponent(date)}`;
      }
      return res.redirect(baseUrl);
    } catch (e) {
      next(e);
    }
  }
}
