import { injectable } from "inversify";
import { IFileRecordRepository } from "../interface/repository/file-record-repository-interface";
import { prismaClient } from "../application/database";
import { FileRecordRequest, FileRecordResponse } from "../model/model";

@injectable()
export class FileRecordRepository implements IFileRecordRepository {
  constructor() {}

  async createFileRecord(fileRecord: FileRecordRequest): Promise<void> {
    await prismaClient.fileRecord.create({
      data: fileRecord,
    });
  }

  async findAllFileRecordByScenarioId(
    scenarioId: number,
    pageSize: number,
    page: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<FileRecordResponse[]> {
    return prismaClient.fileRecord.findMany({
      where: {
        scenario: {
          id: scenarioId,
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

  async countTotalFileRecordByScenarioId(
    scenarioId: number,
    testCase?: string,
    startDate?: number,
    endDate?: number
  ): Promise<number> {
    return prismaClient.fileRecord.count({
      where: {
        scenario: {
          id: scenarioId,
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
