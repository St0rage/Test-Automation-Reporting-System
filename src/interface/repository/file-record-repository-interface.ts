import { FileRecordRequest, FileRecordResponse } from "../../model/model";

export interface IFileRecord {
  findAllFileRecordByScenarioName(
    scenarioName: string,
    page: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<FileRecordResponse[]>;
  countTotalFileRecordByScenarioName(
    scenarioName: string,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<number>;
  checkFileRecordIsExist(id: number): Promise<string | null>;
  createFileRecord(fileRecord: FileRecordRequest): Promise<void>;
  deleteFileRecordById(id: number): Promise<string>;
}
