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
    page: number
  ): Promise<FileRecordResponse[]> {
    const pageSize = 10;

    return prismaClient.fileRecord.findMany({
      where: {
        scenario: {
          name: scenarioName,
        },
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
    scenarioName: string
  ): Promise<number> {
    return prismaClient.fileRecord.count({
      where: {
        scenario: {
          name: scenarioName,
        },
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
}
