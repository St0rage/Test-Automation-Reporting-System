import { inject, injectable } from "inversify";
import { IWebService } from "../interface/service/web-service-interface";
import {
  FileRecordResponse,
  IdAndName,
  ProjectScenarioResponse,
} from "../model/model";
import { TYPES } from "../di/types";
import { IProjectRepository } from "../interface/repository/project-repository-interface";
import { ITestCaseRepository } from "../interface/repository/testcase-repository-interface";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";
import fs from "fs";
import path from "path";
import { FileSystem } from "../utils/file-system-util";
import jsPDF from "jspdf";

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
    page: number
  ): Promise<FileRecordResponse[]> {
    return this.fileRecordRepository.findAllFileRecordByScenarioName(
      scenarioName,
      page
    );
  }

  async getTotalFileRecordByScenarioName(
    scenarioName: string
  ): Promise<number> {
    return this.fileRecordRepository.countTotalFileRecordByScenarioName(
      scenarioName
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
}
