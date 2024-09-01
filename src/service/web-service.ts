import { inject, injectable } from "inversify";
import jsPDF from "jspdf";
import path from "path";
import { TYPES } from "../di/types";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IWebService } from "../interface/service/web-service-interface";
import {
  FileRecordResponse,
  IdAndName,
  ProjectScenarioResponse,
} from "../model/model";
import { FileSystem } from "../utils/file-system-util";
import moment from "moment";

@injectable()
export class WebService implements IWebService {
  constructor(
    @inject(TYPES.IProjectRepository)
    private projectRepository: IProjectRepository,
    @inject(TYPES.ITestCaseRepository)
    private testCaseRepository: ITestCaseRepository,
    @inject(TYPES.IFileRecord) private fileRecordRepository: IFileRecord
  ) {}

  async getAllProjectAndScenario(): Promise<ProjectScenarioResponse[]> {
    return this.projectRepository.findAllProjectAndScenario();
  }

  async getAllTestCaseByScenarioName(
    scenarioName: string
  ): Promise<IdAndName[]> {
    return this.testCaseRepository.findAllTestCaseByScenarioName(scenarioName);
  }

  async getAllFileRecordByScenarioName(
    scenarioName: string,
    page: number,
    testCase: string,
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

    return this.fileRecordRepository.findAllFileRecordByScenarioName(
      scenarioName,
      page,
      testCase !== undefined ? testCase.toUpperCase() : testCase,
      startDate,
      endDate
    );
  }

  async getTotalFileRecordByScenarioName(
    scenarioName: string,
    testCase: string,
    date: string
  ): Promise<number> {
    let startDate: number | undefined;
    let endDate: number | undefined;

    if (date) {
      startDate = moment(date, "DD/MM/YYYY").startOf("day").unix();
      endDate = moment(date, "DD/MM/YYYY").endOf("day").unix();
    } else {
      startDate = undefined;
      endDate = undefined;
    }

    return this.fileRecordRepository.countTotalFileRecordByScenarioName(
      scenarioName,
      testCase !== undefined ? testCase.toUpperCase() : testCase,
      startDate,
      endDate
    );
  }

  async validateReportLogo(): Promise<string> {
    const logoPath = path.join(
      __dirname,
      "..",
      "public",
      "img",
      "report-logo.png"
    );
    const logoTemp = path.join(
      __dirname,
      "..",
      "public",
      "img",
      "report-logo-temp.png"
    );

    const imageBuffer = await FileSystem.getImageBinary(logoTemp);
    const imageString = `data:image/png;base64,${imageBuffer.toString(
      "base64"
    )}`;

    try {
      const tempDoc = new jsPDF();
      tempDoc.addImage(imageString, "PNG", 10, 10, 35, 10);
      await FileSystem.deleteFile(logoPath);
      await FileSystem.renameFile(logoTemp, logoPath);
      return "";
    } catch (e) {
      await FileSystem.deleteFile(logoTemp);
      return "Upload failed. Please ensure the image is not compressed.";
    }
  }

  async deleteFileRecordById(fileRecordId: number): Promise<void> {
    const fileName = await this.fileRecordRepository.deleteFileRecordById(
      fileRecordId
    );

    const reportPath = process.env.REPORT_PATH as string;
    const fullPath = path.join(reportPath, fileName);

    await FileSystem.deleteFile(fullPath);
  }
}
