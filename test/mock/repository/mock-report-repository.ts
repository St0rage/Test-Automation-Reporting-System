import { injectable } from "inversify";
import { IReportRepository } from "../../../src/interface/repository/report-repository-interface";
import { ReportInsertRequest, ReportResponse } from "../../../src/model/model";

@injectable()
export class MockReportRepository implements IReportRepository {
  private reports: {
    id: number;
    project_id: number;
    scenario_id: number;
    test_case_id: number;
    tool_id: number;
    activity: string;
    author: string;
  }[] = [];

  async checkReportIsExist(id: number): Promise<Boolean> {
    return this.reports.some((value) => value.id === id);
  }

  async createReport(
    reportModel: ReportInsertRequest
  ): Promise<{ id: number }> {
    return { id: 1 };
  }

  async deleteReportById(id: number): Promise<void> {}

  async getReportById(id: number): Promise<ReportResponse> {
    return {
      project: { name: "DUMMY" },
      activity: "DUMMY",
      author: "ANONIM",
      scenario: { id: 1, name: "DUMMY" },
      test_case: { id: 1, name: "DUMMY" },
      tool: { name: "DUMMY" },
    };
  }
}
