import { FileRecordRequest, FileRecordResponse } from "../../model/model";

export interface IFileRecordRepository {
  findAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<FileRecordResponse[]>;
  countTotalFileRecordByScenarioId(
    scenarioId: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<number>;
  checkFileRecordIsExist(id: number): Promise<string | null>;
  createFileRecord(fileRecord: FileRecordRequest): Promise<void>;
  deleteFileRecordById(id: number): Promise<string>;
}
