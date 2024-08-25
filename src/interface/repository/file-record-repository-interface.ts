import { FileRecordRequest, FileRecordResponse } from "../../model/model";

export interface IFileRecord {
  findAllFileRecordByScenarioName(
    scenarioName: string,
    page: number
  ): Promise<FileRecordResponse[]>;
  countTotalFileRecordByScenarioName(scenarioName: string): Promise<number>;
  checkFileRecordIsExist(id: number): Promise<string | null>;
  createFileRecord(fileRecord: FileRecordRequest): Promise<void>;
}
