import fs from "fs";
import { inject, injectable } from "inversify";
import jsPDF from "jspdf";
import moment from "moment";
import path from "path";
import { TYPES } from "../di/types";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IWebService } from "../interface/service/web-service-interface";
import { FileRecordResponse, IdAndUniqueId, ProjectScenarioResponse } from "../model/model";
import { FileSystem } from "../utils/file-system-util";

@injectable()
export class WebService implements IWebService {
  constructor(
    @inject(TYPES.IProjectRepository)
    private projectRepository: IProjectRepository,
    @inject(TYPES.ITestCaseRepository)
    private testCaseRepository: ITestCaseRepository,
    @inject(TYPES.IFileRecordRepository)
    private fileRecordRepository: IFileRecordRepository
  ) {}

  async getAllProjectAndScenario(): Promise<ProjectScenarioResponse[]> {
    return this.projectRepository.findAllProjectAndScenario();
  }

  async getAllTestCaseByScenarioId(scenarioId: number): Promise<IdAndUniqueId[]> {
    return this.testCaseRepository.findAllTestCaseByScenarioId(scenarioId);
  }

  async getAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCaseId: string,
    date: string
  ): Promise<FileRecordResponse[]> {
    let startDate: number | undefined;
    let endDate: number | undefined;

    if (date) {
      startDate = moment(date, "DD/MM/YYYY").startOf("day").unix();
      endDate = moment(date, "DD/MM/YYYY").endOf("day").unix();
    } else {
      startDate = undefined;
      endDate = undefined;
    }

    return this.fileRecordRepository.findAllFileRecordByScenarioId(
      scenarioId,
      pageSize,
      page,
      testCaseId !== undefined ? testCaseId.toUpperCase() : testCaseId,
      startDate,
      endDate
    );
  }

  async getTotalFileRecordByScenarioId(scenarioId: number, testCase: string, date: string): Promise<number> {
    let startDate: number | undefined;
    let endDate: number | undefined;

    if (date) {
      startDate = moment(date, "DD/MM/YYYY").startOf("day").unix();
      endDate = moment(date, "DD/MM/YYYY").endOf("day").unix();
    } else {
      startDate = undefined;
      endDate = undefined;
    }

    return this.fileRecordRepository.countTotalFileRecordByScenarioId(
      scenarioId,
      testCase !== undefined ? testCase.toUpperCase() : testCase,
      startDate,
      endDate
    );
  }

  async deleteFileRecordById(fileRecordId: number): Promise<void> {
    const fileName = await this.fileRecordRepository.deleteFileRecordById(fileRecordId);

    const reportPath = process.env.REPORT_PATH as string;
    const fullPath = path.join(reportPath, fileName);

    await FileSystem.deleteFile(fullPath);
  }
}
