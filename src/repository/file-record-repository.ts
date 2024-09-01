import { injectable } from "inversify";
import { IFileRecord } from "../interface/repository/file-record-repository-interface";
import { prismaClient } from "../application/database";
import { FileRecordRequest, FileRecordResponse } from "../model/model";

@injectable()
export class FileRecordRepository implements IFileRecord {
  constructor() {}

  async createFileRecord(fileRecord: FileRecordRequest): Promise<void> {
    await prismaClient.fileRecord.create({
      data: fileRecord,
    });
  }

  async findAllFileRecordByScenarioName(
    scenarioName: string,
    page: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<FileRecordResponse[]> {
    const pageSize = 10;

    return prismaClient.fileRecord.findMany({
      where: {
        scenario: {
          name: scenarioName,
        },
        test_case: {
          name: testCase,
        },
        created_time:
          startDate !== undefined
            ? { gte: startDate, lte: endDate }
            : undefined,
      },
      select: {
        id: true,
        file_name: true,
        created_time: true,
        status: {
          select: {
            name: true,
          },
        },
        test_case: {
          select: {
            name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "desc" },
    });
  }

  async countTotalFileRecordByScenarioName(
    scenarioName: string,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<number> {
    return prismaClient.fileRecord.count({
      where: {
        scenario: {
          name: scenarioName,
        },
        test_case: {
          name: testCase,
        },
        created_time:
          startDate !== undefined
            ? { gte: startDate, lte: endDate }
            : undefined,
      },
    });
  }

  async checkFileRecordIsExist(id: number): Promise<string | null> {
    const result = await prismaClient.fileRecord.findFirst({
      where: {
        id: id,
      },
      select: {
        file_name: true,
      },
    });

    if (result != null) {
      return result.file_name;
    }

    return result;
  }

  async deleteFileRecordById(id: number): Promise<string> {
    const result = await prismaClient.fileRecord.delete({
      where: {
        id: id,
      },
      select: {
        file_name: true,
      },
    });

    return result.file_name;
  }
}
