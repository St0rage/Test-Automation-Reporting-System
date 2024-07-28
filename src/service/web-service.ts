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
}
