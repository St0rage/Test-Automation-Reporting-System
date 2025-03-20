import { injectable } from "inversify";
import { IFileRecordRepository } from "../../../src/interface/repository/file-record-repository-interface";
import {
  FileRecordRequest,
  FileRecordResponse,
} from "../../../src/model/model";

@injectable()
export class MockFileRecordRepository implements IFileRecordRepository {
  async checkFileRecordIsExist(id: number): Promise<string | null> {
    return "";
  }

  async countTotalFileRecordByScenarioId(
    scenarioId: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<number> {
    if (startDate === undefined) {
      return 2;
    }

    return 1;
  }

  async createFileRecord(fileRecord: FileRecordRequest): Promise<void> {}

  async deleteFileRecordById(id: number): Promise<string> {
    return "";
  }

  async findAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<FileRecordResponse[]> {
    if (startDate === undefined) {
      return [
        {
          created_time: 222222,
          file_name: "asdasdsad",
          id: 11,
          status: { name: "FAILED" },
          test_case: { name: "asdasd" },
        },
      ];
    }

    return [
      {
        created_time: 111111,
        file_name: "asdasdsad",
        id: 11,
        status: { name: "FAILED" },
        test_case: { name: "asdasd" },
      },
    ];
  }
}
