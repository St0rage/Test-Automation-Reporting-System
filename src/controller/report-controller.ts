import { inject } from "inversify";
import { IReportService } from "../service/interface/report-service-interface";

export class ReportController {
  private reportService: IReportService;

  constructor(@inject("IReportService") reportService: IReportService) {
    this.reportService = reportService;
  }
}
